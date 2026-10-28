import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import SectionLabel from './SectionLabel'
import './WorkSection.css'

function getVideoSource(project) {
  if (project.playbackId) {
    return `https://stream.mux.com/${project.playbackId}.m3u8`
  }

  return project.src
}

function ManagedVideo({ project, videoRef, onPlaybackError, autoPlay = false, ...props }) {
  const internalRef = useRef(null)
  useImperativeHandle(videoRef, () => internalRef.current)

  useEffect(() => {
    const video = internalRef.current
    if (!video) return undefined

    const source = getVideoSource(project)
    let hlsInstance
    let isCancelled = false
    const reportError = (message, details) => {
      if (isCancelled) return
      console.error('[Video playback]', project.title, message, details)
      onPlaybackError?.(message)
    }
    const handleMediaError = () => {
      reportError(`Video could not load (media error ${video.error?.code ?? 'unknown'}). Try again.`, video.error)
    }
    const requestAutoplay = () => {
      if (!autoPlay) return
      video.play().catch((error) => {
        if (isCancelled || error.name === 'AbortError') return
        reportError(error.name === 'NotAllowedError'
          ? 'Your browser paused automatic playback. Press Play to start.'
          : 'Playback could not start. Try again.', error)
      })
    }
    const startPreview = () => hlsInstance?.startLoad()
    const stopPreview = () => hlsInstance?.stopLoad()
    const startupTimeout = autoPlay ? window.setTimeout(() => {
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        reportError('The video is taking too long to load. Try again or check your connection.', {
          readyState: video.readyState,
          networkState: video.networkState,
          source,
        })
      }
    }, 20000) : undefined
    const handleCanPlay = () => window.clearTimeout(startupTimeout)

    video.addEventListener('error', handleMediaError)
    video.addEventListener('canplay', handleCanPlay)
    if (!autoPlay) {
      video.addEventListener('play', startPreview)
      video.addEventListener('pause', stopPreview)
    }

    const attachHls = async () => {
      if (!project.playbackId) {
        video.src = source
        requestAutoplay()
        return
      }
      const { default: Hls } = await import('hls.js')

      if (isCancelled) return

      if (!Hls.isSupported()) {
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source
          requestAutoplay()
        } else {
          reportError('This browser does not support this video format.')
        }
        return
      }

      // Previews only download media while playing; the modal gets priority.
      hlsInstance = new Hls({ autoStartLoad: autoPlay, capLevelToPlayerSize: true })
      hlsInstance.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return
        const status = data.response?.code
        reportError(`Video streaming failed (${data.details}${status ? `, HTTP ${status}` : ''}). Try again.`, data)
      })
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!autoPlay && !video.paused) startPreview()
        requestAutoplay()
      })
      hlsInstance.on(Hls.Events.MEDIA_ATTACHED, () => hlsInstance.loadSource(source))
      hlsInstance.attachMedia(video)
    }

    attachHls().catch((error) => reportError('The video player could not initialize. Try again.', error))

    return () => {
      isCancelled = true
      window.clearTimeout(startupTimeout)
      video.removeEventListener('error', handleMediaError)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', startPreview)
      video.removeEventListener('pause', stopPreview)
      if (hlsInstance) hlsInstance.destroy()
      video.removeAttribute('src')
      video.load()
    }
  }, [project, autoPlay, onPlaybackError])

  return (
    <video
      {...props}
      autoPlay={autoPlay}
      poster={project.poster}
      ref={internalRef}
    />
  )
}

function WorkCard({ project, hint, onCursorChange, onOpen, onPreviewRef }) {
  const projectKey = project.playbackId ?? project.src

  const playPreview = (event) => {
    const video = event.currentTarget.querySelector('video')
    onCursorChange(true)
    video?.play()?.catch(() => {})
  }

  const pausePreview = (event) => {
    const video = event.currentTarget.querySelector('video')
    onCursorChange(false)
    video?.pause()
    if (video) video.currentTime = 0
  }

  return (
    <article
      className={`work-card reveal ${project.orientation === 'portrait' ? 'is-portrait' : 'is-landscape'}`}
      onMouseEnter={playPreview}
      onMouseLeave={pausePreview}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(project)
        }
      }}
    >
      <div className="work-card__inner">
        <div className="work-card__media">
          <ManagedVideo
            className="work-card__video"
            project={project}
            muted
            loop
            playsInline
            preload="metadata"
            videoRef={(node) => {
              onPreviewRef(projectKey, node)
            }}
          />
          <div className="work-card__play">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="work-card__overlay">
          <div className="work-card__meta">{project.number}</div>
          <div className="work-card__title">{project.title}</div>
        </div>
        <div className="work-card__hover">{hint}</div>
      </div>
    </article>
  )
}

function WorkSection({ sections, onCursorChange }) {
  const totalProjects = sections.reduce((count, section) => count + section.projects.length, 0)
  const [activeProject, setActiveProject] = useState(null)
  const [isModalPlaying, setIsModalPlaying] = useState(false)
  const [isModalMuted, setIsModalMuted] = useState(false)
  const [modalError, setModalError] = useState(null)
  const [playbackAttempt, setPlaybackAttempt] = useState(0)
  const modalVideoRef = useRef(null)
  const previewRefs = useRef({})

  const pauseAllPreviews = () => {
    Object.values(previewRefs.current).forEach((video) => {
      if (!video) return
      video.pause()
      video.currentTime = 0
    })
  }

  const openModal = (project) => {
    pauseAllPreviews()
    setIsModalPlaying(false)
    setModalError(null)
    setIsModalMuted(false)
    setActiveProject(project)
    onCursorChange(false)
  }

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      modalVideoRef.current.currentTime = 0
    }
    setActiveProject(null)
    setIsModalPlaying(false)
    setModalError(null)
    setIsModalMuted(false)
  }

  const toggleModalPlayback = () => {
    const video = modalVideoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch((error) => {
        if (error.name === 'AbortError') return
        console.error('[Video playback]', error)
        setModalError(error.name === 'NotAllowedError'
          ? 'Your browser blocked playback. Check this site’s autoplay permission.'
          : 'Playback could not start. Try again.')
      })
      return
    }

    video.pause()
  }

  const toggleModalMute = () => {
    const video = modalVideoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsModalMuted(video.muted)
  }

  useEffect(() => {
    if (!activeProject) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject])

  return (
    <section className="work-section" id="work">
      <div className="work-section__header">
        <div className="reveal">
          <SectionLabel>Past Projects</SectionLabel>
          <div className="work-section__title">
            Selected
            <span>Work</span>
          </div>
        </div>
        <div className="work-section__count reveal">{String(totalProjects).padStart(2, '0')} Projects</div>
      </div>

      <div className="work-section__groups">
        {sections.map((section, index) => (
          <div className="work-group" key={section.slug}>
            <div className={`work-group__intro reveal reveal-delay-${(index % 3) + 1}`}>
              <div>
                <h2 className="work-group__title">{section.title}</h2>
              </div>
              <p className="work-group__desc">{section.description}</p>
            </div>

            <div className={`work-group__grid work-group__grid--${section.slug}`}>
              {section.projects.map((project) => (
                <WorkCard
                  key={`${section.slug}-${project.number}`}
                  project={project}
                  hint="Open with sound"
                  onCursorChange={onCursorChange}
                  onOpen={openModal}
                  onPreviewRef={(key, node) => { previewRefs.current[key] = node }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeProject ? (
        <div className="work-modal" onClick={closeModal} role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <div className="work-modal__panel" onClick={(event) => event.stopPropagation()}>
            <div className="work-modal__header">
              <div className="work-modal__topbar">
                <div className="work-modal__heading">
                  <div className="work-modal__meta">{activeProject.number}</div>
                  <h3 className="work-modal__title">{activeProject.title}</h3>
                </div>
                <button className="work-modal__close" type="button" onClick={closeModal} aria-label="Close video">
                  ×
                </button>
              </div>
              <div className="work-modal__side">
                <div className="work-modal__controls">
                  <button className="work-modal__action" type="button" onClick={toggleModalPlayback}>
                    {isModalPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button className="work-modal__action" type="button" onClick={toggleModalMute}>
                    {isModalMuted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              </div>
            </div>
            {modalError ? (
              <div className="work-modal__error" role="status">
                <p>{modalError}</p>
                <button className="work-modal__action" type="button" onClick={() => {
                  setModalError(null)
                  setIsModalPlaying(false)
                  setPlaybackAttempt((attempt) => attempt + 1)
                }}>Try again</button>
              </div>
            ) : null}
            <div className={`work-modal__video-wrap ${activeProject.orientation === 'portrait' ? 'is-portrait' : 'is-landscape'}`}>
              <ManagedVideo
                key={`${activeProject.playbackId ?? activeProject.src}-${playbackAttempt}`}
                className="work-modal__video"
                project={activeProject}
                controls
                autoPlay
                playsInline
                preload="metadata"
                videoRef={modalVideoRef}
                onPlaybackError={setModalError}
                onPlay={() => setIsModalPlaying(true)}
                onPlaying={() => setModalError(null)}
                onPause={() => setIsModalPlaying(false)}
                onEnded={() => setIsModalPlaying(false)}
                onVolumeChange={(event) => setIsModalMuted(event.currentTarget.muted)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default WorkSection
