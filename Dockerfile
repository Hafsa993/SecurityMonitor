# Multi-stage build for Privacy Tracker (Next.js 16 app)
# Stage 1: Builder - installs dependencies and builds the app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy all app files (src, public, config, package.json, etc.)
COPY app/ .

# Install all dependencies (including dev deps needed for Next.js build)
RUN npm install

# Build Next.js application
RUN npm run build

# Stage 2: Runner - minimal production image
FROM node:22-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["npm", "start"]
