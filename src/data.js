export const marqueeItems = [
  'Videography',
  'Video Editing',
  'Photography',
  'Graphic Design',
  'Content Creation',
]

export const marqueeLoop = [...marqueeItems, ...marqueeItems]

function buildMuxProjects(projects, category, format, orientation) {
  return projects.map((project, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: project.title,
    type: `${category} — ${format}`,
    playbackId: project.playbackId,
    poster: `https://image.mux.com/${project.playbackId}/thumbnail.jpg?time=2`,
    orientation,
  }))
}

export const workSections = [
  {
    slug: 'social-media',
    label: 'Social Media Videos',
    title: 'Social Media Content',
    description: 'Vertical cuts, reels, and platform-first edits built for quick attention.',
    projects: buildMuxProjects(
      [
        {
          title: 'IN8 Life - 90 Day Root Cause Program',
          playbackId: 'S8S6b3RPxnEwxmzDjchgbIbiaxSvrBViT017vbJeU01Nc',
        },
        {
          title: "IN8 Life - Zach's Health Journey",
          playbackId: 'maNhCs201E02hE00qVHtQ7uK8KQYN00e7HTLbkEQyBLGoQ8',
        },
        {
          title: 'Batik Boutique - Raya Homeware',
          playbackId: 'G53adXoWThOt35q1CVdKAWAynRWyT4Fd01BPZxeTCyKc',
        },
        {
          title: 'Batik Boutique - Chinese New Year Gift Ideas',
          playbackId: '15JS8iOK8hYNka02T2GRTB2vXLkY7xYN02laZKHBO02a9I',
        },
        {
          title: "Batik Boutique - Men's Navy Orchid Shirt",
          playbackId: 'QE67frBc01tQKk01YrA2iM9G7015QwjiPKcO01QFqijOY00Y',
        },
      ],
      'Social Media',
      '9:16',
      'portrait',
    ),
  },
  {
    slug: 'promotional',
    label: 'Promotional Videos',
    title: 'Promotional Videos',
    description: 'Widescreen event and brand videos designed for richer storytelling.',
    projects: buildMuxProjects(
      [
        {
          title: 'Believe Fitness - Believe Open 2025 Event Video',
          playbackId: 'Yeuc00QpQRDt72z3Z01PMMdy401wJOQshRCsLxE2o0202a100',
        },
        {
          title: 'The IN8 Summit 2025 Event Video',
          playbackId: 'g4Wlt684AL02sMHkeittMpe01rbaNDBS9QopQp4C785PM',
        },
        {
          title: 'TCI Promo Video 2025',
          playbackId: '5UwgHZ01raai00SnHGFxDJoYwlRsV81R01WJhLjzYi8CoI',
        },
      ],
      'Promotional',
      '16:9',
      'landscape',
    ),
  },
]

export const graphicsProjects = [
  { title: 'Brand Identity', subtitle: 'Visual System — 2024', pattern: 'rings' },
  { title: 'Editorial Design', subtitle: 'Print — 2024', pattern: 'frames' },
  { title: 'Poster Series', subtitle: 'Typographic — 2023', pattern: 'triangle' },
  { title: 'Art Direction', subtitle: 'Campaign — 2023', pattern: 'organic' },
  { title: 'Motion Graphics', subtitle: 'Title Sequences — 2024', pattern: 'grid' },
  { title: 'Packaging Design', subtitle: 'Product — 2023', pattern: 'hex' },
]

export const contactLinks = [
  {title: 'Linkedin', link:'https://www.linkedin.com/in/nik-nurain-nik-azlan-941507288/'},
  

]

export const yearsOfStorytelling = 3
