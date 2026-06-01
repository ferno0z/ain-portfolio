import { useEffect, useRef, useState } from 'react'
import SectionLabel from './SectionLabel'
import './WorkSection.css'

function getVideoSource(project) {
  if (project.playbackId) {
    return `https://stream.mux.com/${project.playbackId}.m3u8`
  }

  return project.src
}

function ManagedVideo({ project, videoRef, ...props }) {
  const internalRef = useRef(null)

  useEffect(() => {
    const video = internalRef.current
    if (!video) return undefined

    if (!project.playbackId) {
      video.src = project.src
      return undefined
    }

    const source = getVideoSource(project)

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source
      return undefined
    }

    let hlsInstance
    let isCancelled = false

    const attachHls = async () => {
      const { default: Hls } = await import('hls.js')

      if (isCancelled) return

      if (!Hls.isSupported()) {
        video.src = source
        return
      }

      hlsInstance = new Hls()
      hlsInstance.loadSource(source)
      hlsInstance.attachMedia(video)
    }

    attachHls()

    return () => {
      isCancelled = true
      if (hlsInstance) hlsInstance.destroy()
    }
  }, [project])

  return (
    <video
      {...props}
      poster={project.poster}
      ref={(node) => {
        internalRef.current = node
        if (typeof videoRef === 'function') {
          videoRef(node)
        } else if (videoRef) {
          videoRef.current = node
        }
      }}
    />
  )
}

function WorkCard({ project, hint, onCursorChange, onOpen, previewRefs }) {
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
              previewRefs.current[projectKey] = node
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
  const [isModalPlaying, setIsModalPlaying] = useState(true)
  const [isModalMuted, setIsModalMuted] = useState(false)
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
    setIsModalPlaying(true)
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
    setIsModalPlaying(true)
    setIsModalMuted(false)
  }

  const toggleModalPlayback = () => {
    const video = modalVideoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
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
                  previewRefs={previewRefs}
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
            <div className={`work-modal__video-wrap ${activeProject.orientation === 'portrait' ? 'is-portrait' : 'is-landscape'}`}>
              <ManagedVideo
                className="work-modal__video"
                project={activeProject}
                controls
                autoPlay
                playsInline
                preload="metadata"
                videoRef={modalVideoRef}
                onPlay={() => setIsModalPlaying(true)}
                onPause={() => setIsModalPlaying(false)}
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
