# Docker Setup for Privacy Tracker

This document explains the Docker configuration for the Privacy Tracker application and how to use it.

## Overview

The Privacy Tracker is a Next.js 16 application that has been containerized for easy deployment across different machines and environments. The setup includes:

- **Dockerfile**: Production-optimized multi-stage build
- **Dockerfile.dev**: Development image with hot reload
- **docker-compose.yml**: Production orchestration
- **docker-compose.dev.yml**: Development orchestration
- **.dockerignore**: Excludes unnecessary files from Docker context

## System Requirements

- **Docker**: Version 20.10 or higher ([install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose**: Version 1.29 or higher (included with Docker Desktop)
- **Disk space**: ~1.5GB for image and containers

## Quick Start

### Option 1: Production Build (Recommended for Distribution)

Use this for creating the app for distribution to others or for deployment.

```bash
# Build the production image
docker build -t privacy-tracker:1.0 .

# Run the container
docker run -p 3000:3000 privacy-tracker:1.0
```

Open browser: **http://localhost:3000**

### Option 2: Docker Compose (Recommended for Easy Management)

```bash
# Build and start in production mode
docker-compose up --build

# Or just start if image already built
docker-compose up
```

The app will be available at **http://localhost:3000**

Press `Ctrl+C` to stop.

### Option 3: Development Mode (for Contributors)

Use this if you want to modify the code and see changes in real-time.

```bash
# Using Docker Compose with hot reload
docker-compose -f docker-compose.dev.yml up --build
```

Changes to `src/` and `public/` directories will automatically reload.

### Option 4: Manual Development Container

```bash
# Build development image
docker build -f Dockerfile.dev -t privacy-tracker:dev .

# Run with volume mounting for hot reload
docker run -p 3000:3000 \
  -v $(pwd)/app/src:/app/src \
  -v $(pwd)/app/public:/app/public \
  privacy-tracker:dev
```

## File Structure Explained

### Dockerfile (Production)

**Multi-stage build approach:**

```
Stage 1: Builder
├─ Base: node:18-alpine (170MB)
├─ Install dependencies: npm ci --only=production
├─ Build app: npm run build
└─ Result: Intermediate image with compiled code

↓ Copy only necessary files ↓

Stage 2: Runner (Final Image)
├─ Base: node:18-alpine (170MB)
├─ Files: node_modules, .next, public
├─ Non-root user: nextjs (security)
├─ Health check: HTTP endpoint monitoring
└─ Final size: ~350MB
```

**Key optimizations:**
- `npm ci` instead of `npm install` (faster, more reliable)
- Multi-stage build (removes builder tools from final image)
- Non-root user (security best practice)
- Health check (Kubernetes/Docker monitoring compatible)
- Alpine Linux base (smaller than Ubuntu)

### Dockerfile.dev (Development)

- Single stage (simpler, no optimization needed)
- Includes dev dependencies (`@testing-library`, `jest`)
- Runs `npm run dev` for hot reload
- Volumes mounted for source code changes

### .dockerignore

Excludes files that shouldn't be copied into the image:
- `node_modules` (will be installed in container)
- `.next` (built fresh in container)
- `.git`, `.github` (not needed in runtime)
- Test files and documentation (not needed in production)

Reduces Docker build context from ~800MB to ~50MB (10x faster builds).

### docker-compose.yml (Production)

**Features:**
- Service name: `privacy-tracker`
- Port mapping: `3000:3000`
- Environment: `NODE_ENV=production`
- Restart policy: `unless-stopped` (auto-restart if crashes)
- Health check: Monitors container health
- Resource limits: 512MB max memory, 1 CPU max
- Named volume for node_modules (prevents corruption)

### docker-compose.dev.yml (Development)

**Features:**
- Volume mounting for hot reload
- TTY and stdin enabled (interactive debugging)
- All dev dependencies available
- Direct source code access

## Common Tasks

### Check if Container is Running

```bash
docker ps
```

You should see `privacy-tracker-app` (or your container name) in the list.

### View Container Logs

```bash
# Real-time logs
docker logs -f <container-id-or-name>

# Last 50 lines
docker logs --tail 50 <container-id-or-name>

# With timestamps
docker logs -t <container-id-or-name>
```

### Stop Container

```bash
# Using Docker Compose
docker-compose down

# Or manually
docker stop <container-id-or-name>
```

### Rebuild Image After Code Changes

```bash
# Option 1: Using Compose
docker-compose up --build

# Option 2: Manual
docker build -t privacy-tracker:1.0 .
```

### Execute Command Inside Container

```bash
docker exec <container-id> npm run test
```

### Remove Old Images

```bash
# List all images
docker images

# Remove unused images
docker image prune

# Remove image by name
docker rmi privacy-tracker:1.0
```

## Deployment Scenarios

### Scenario 1: Share with Friends/Colleagues

```bash
# Build image on your machine
docker build -t privacy-tracker:1.0 .

# Save to file (~350MB)
docker save privacy-tracker:1.0 -o privacy-tracker.tar

# Transfer file to friend's machine, then:
docker load -i privacy-tracker.tar
docker run -p 3000:3000 privacy-tracker:1.0
```

### Scenario 2: Deploy to Docker Hub (Free Registry)

```bash
# Create Docker Hub account at hub.docker.com

# Login to Docker Hub
docker login

# Tag image with your username
docker tag privacy-tracker:1.0 yourusername/privacy-tracker:1.0

# Push to Docker Hub
docker push yourusername/privacy-tracker:1.0

# Anyone can now run:
# docker run -p 3000:3000 yourusername/privacy-tracker:1.0
```

### Scenario 3: Classroom Deployment (50 Students)

**Teacher's perspective:**

```bash
# Build once
docker build -t privacy-tracker:1.0 .

# Push to Docker Hub
docker push yourusername/privacy-tracker:1.0

# Send students this command:
# docker run -p 3000:3000 yourusername/privacy-tracker:1.0
```

**Student's perspective:**

```bash
# That's it! One command does everything:
docker run -p 3000:3000 yourusername/privacy-tracker:1.0

# App opens at http://localhost:3000
```

No Node.js installation, no npm install, no path issues. Works on Windows, Mac, Linux identically.

### Scenario 4: Production Cloud Deployment

**AWS EC2 Example:**

```bash
# On AWS instance with Docker installed:
docker run -d \
  -p 80:3000 \
  --name privacy-tracker \
  --restart always \
  yourusername/privacy-tracker:1.0

# App now available at your.domain.com (no :3000)
```

**Google Cloud Run Example:**

```bash
# Push to Google Container Registry
docker tag privacy-tracker:1.0 gcr.io/your-project/privacy-tracker:1.0
docker push gcr.io/your-project/privacy-tracker:1.0

# Deploy
gcloud run deploy privacy-tracker \
  --image gcr.io/your-project/privacy-tracker:1.0 \
  --platform managed
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use different port
docker run -p 8000:3000 privacy-tracker:1.0

# Access at http://localhost:8000
```

Or stop other containers:
```bash
docker stop <container-using-port>
```

### Container Keeps Crashing

```bash
# Check logs
docker logs privacy-tracker-app

# Look for errors in output

# Common issues:
# - Out of memory: reduce other apps, increase Docker memory allocation
# - Port already in use: use different port (-p 8000:3000)
# - Network issue: restart Docker daemon
```

### Build Takes Too Long

The first build is slow (~2-3 minutes) because it's downloading and installing dependencies. Subsequent builds are much faster due to Docker layer caching.

```bash
# Speed up by clearing cache and rebuilding
docker build --no-cache -t privacy-tracker:1.0 .
```

### Changes Not Reflecting (Production)

You need to rebuild the image:

```bash
docker build -t privacy-tracker:1.0 .
docker-compose down
docker-compose up
```

Or use development mode if you want hot reload:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

## Image Size Reference

| Build Type | Size | Use Case |
|---|---|---|
| Production | ~350MB | Distribution, deployment |
| Development | ~450MB | Local development |
| Nginx variant | ~520MB | Large-scale production |

## Security Considerations

1. **Non-root user**: Container runs as `nextjs` user (UID 1001), not root
2. **Read-only root filesystem** (optional, can be added to compose):
   ```yaml
   read_only: true
   tmpfs:
     - /tmp
   ```
3. **Network isolation**: Only expose port 3000
4. **Secret management**: Use Docker Compose `.env` files for sensitive data

## Cgroup Memory Limit

If you see "JavaScript heap out of memory" errors:

```bash
# Increase Node.js memory limit
docker-compose up -e NODE_OPTIONS="--max-old-space-size=1024"

# Or in docker-compose.yml
environment:
  - NODE_OPTIONS=--max-old-space-size=1024
```

## Advanced: Custom Environment

Add custom environment variables in `.env.production`:

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
```

Then rebuild:
```bash
docker build -t privacy-tracker:1.0 .
```

## Next Steps

1. **For local development**: Use `docker-compose.dev.yml`
2. **For sharing**: Push to Docker Hub
3. **For scaling**: Consider Kubernetes (see main analysis)
4. **For CI/CD**: Integrate with GitHub Actions

---

## Summary of Docker Complexity

| Aspect | Simple | Medium | Advanced |
|---|---|---|---|
| **Setup** | `docker run` | `docker-compose up` | Kubernetes + Helm |
| **Time to learn** | 5 minutes | 15 minutes | Several hours |
| **Benefit** | Works anywhere | Easy management | Enterprise scale |
| **Use for app** | ✓ | ✓ | Later (if growing) |

**Recommendation**: Use `docker-compose.yml` for production and `docker-compose.dev.yml` for development. Simple, powerful, and maintains consistency.
