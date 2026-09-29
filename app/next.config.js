/** @type {import('next').NextConfig} */
const nextConfig = {}

// GitHub Pages build: static export served from /<repo-name>/
// (set by the deploy workflow; local dev and Docker are unaffected)
if (process.env.STATIC_EXPORT === 'true') {
  nextConfig.output = 'export'
  nextConfig.basePath = process.env.BASE_PATH || ''
}

module.exports = nextConfig
