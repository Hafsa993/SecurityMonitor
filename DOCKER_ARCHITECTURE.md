# Docker Architecture Diagram for Privacy Tracker

## Overview: Data Flow & File Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPER WORKFLOW                            │
└─────────────────────────────────────────────────────────────────┘

                        Your Code Changes
                              │
                              ▼
                    ┌───────────────────┐
                    │ app/src/          │
                    │ app/public/       │
                    │ package.json      │
                    └───────┬───────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────────┐   ┌──────────────┐   ┌─────────────────┐
    │ DEV FLOW     │   │ PROD FLOW    │   │ DISTRIBUTION    │
    └──────────────┘   └──────────────┘   └─────────────────┘
            │               │                    │
    ┌───────▼──────────┐   │           ┌────────▼────────┐
    │ Dockerfile.dev   │   │           │ Dockerfile      │
    │ +               │   │           │ (multi-stage)   │
    │ compose.dev     │   │           └────────┬────────┘
    │ (hot reload)    │   └─────────────────┐  │
    └───────┬──────────┘                     │  │
            │                           ┌────▼──▼────┐
            │                           │   Image    │
            │                         ├────────────┤
            │                         │  350MB     │
            │                         │  (prod)    │
            │                         └───────┬────┘
            │                                 │
            ▼                                 ▼
    ┌──────────────────┐           ┌─────────────────────┐
    │ Docker Container │           │ Distribution Options│
    │ (dev mode)       │           ├─────────────────────┤
    │                  │           │ 1. Docker Hub       │
    │ Runs on 3000     │           │ 2. tar file export  │
    │ Hot reload ✓     │           │ 3. Save & transfer  │
    │ node_modules     │           │ 4. Cloud deploy     │
    │ mounted from     │           │ 5. Docker Compose   │
    │ compose volume   │           └─────────────────────┘
    └──────────────────┘
```

---

## File Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                      DOCKER FILES                           │
└─────────────────────────────────────────────────────────────┘

.dockerignore
    │
    └─▶ Filters what gets copied to build context
        (reduces 800MB → 50MB)

┌─────────────────────┐      ┌─────────────────────┐
│   Dockerfile        │      │ Dockerfile.dev      │
├─────────────────────┤      ├─────────────────────┤
│ Multi-stage build   │      │ Single stage        │
│ FROM node:18-alpine │      │ FROM node:18-alpine │
│ ├─ Builder stage    │      │ └─ Dev tools        │
│ └─ Runner stage     │      └────────┬────────────┘
└──────────┬──────────┘               │
           │                           │
      350MB image                 450MB image
           │                           │
    ┌──────┴────────────┐    ┌────────┴──────────┐
    │                   │    │                   │
    ▼                   ▼    ▼                   ▼
docker-compose.yml     docker-compose.dev.yml
(Production)           (Development)
├─ ports: 3000         ├─ volumes mount src/
├─ restart: always     ├─ tty: true
├─ health check        ├─ hot reload ✓
└─ resource limits     └─ dev dependencies
```

---

## Deployment Paths

```
LOCAL DEVELOPMENT
─────────────────────────────────────────────────────
        app/ source code
               │
               ▼
    docker-compose.dev.yml
               │
               ├─▶ Dockerfile.dev
               │       │
               │       ▼
               │   Dev Container (450MB)
               │       │
               │   Volumes mount:
               │   ├─ app/src
               │   ├─ app/public
               │   └─ node_modules (named vol)
               │
               ▼
    http://localhost:3000 (hot reload)
    Changes saved → Browser refreshes automatically


PRODUCTION BUILD
─────────────────────────────────────────────────────
        app/ source code
               │
               ▼
        Dockerfile
               │
        ┌──────┴──────────┐
        │                 │
        ▼                 ▼
    Stage 1:          Stage 2:
    Builder           Runner
    ├─ node:alpine    ├─ node:alpine
    ├─ npm ci         ├─ Copy from Stage1:
    ├─ npm build      │  ├─ node_modules
    └─ npm run        │  ├─ .next
       build          │  └─ public
                      ├─ Non-root user
                      └─ Health check
                           │
                           ▼
                    Image (350MB)


DISTRIBUTION
─────────────────────────────────────────────────────
        Image (350MB)
               │
        ┌──────┼──────┬──────────┐
        │      │      │          │
        ▼      ▼      ▼          ▼
    Docker   Raw     Cloud    Share
    Hub      tar    Deploy    (file)
     │       file      │        │
     │       │        │         │
Friends   │        AWS      File
(free)    │        GCP      transfer
     │       │        Azure
     └──────┬┘
        Anyone with Docker:
        docker run privacy-tracker:1.0
        │
        ▼
    Works identically on any machine!
```

---

## Docker Build Process (Multi-Stage)

```
STAGE 1: BUILDER
───────────────
FROM node:18-alpine
    │
    ├─ COPY app/package*.json ./
    │  (4 KB)
    │
    ├─ RUN npm ci --only=production
    │  (downloads 500MB+ dependencies)
    │  (creates node_modules/)
    │
    ├─ COPY app/ ./
    │  (copy all source files)
    │
    └─ RUN npm run build
       (creates .next/ directory)
       
    Intermediate Image: ~680MB
    (Contains node_modules + .next + source code + build tools)


COPY FROM STAGE 1 (Only necessary files)
───────────────────────────────────────
COPY --from=builder /app/package*.json ./
    ↓
COPY --from=builder /app/node_modules ./node_modules
    ├─ ~350MB
    ├─ Production dependencies only
    └─ No dev tools
    
COPY --from=builder /app/.next ./.next
    ├─ ~180MB
    ├─ Pre-compiled Next.js
    └─ Ready to serve
    
COPY --from=builder /app/public ./public
    ├─ ~2MB
    └─ Static assets


STAGE 2: RUNNER
───────────────
FROM node:18-alpine
    │
    ├─ COPY --from=builder (extracted above)
    │  └─ Final: 350MB image
    │
    ├─ Create non-root user
    │
    ├─ EXPOSE 3000
    │
    ├─ HEALTHCHECK
    │
    └─ CMD ["npm", "start"]

Final Production Image: ~350MB
(No builder tools, no source code, just runtime!)
```

---

## Runtime Container Stack

```
┌──────────────────────────────────────────────┐
│         Docker Container Running             │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Filesystem (from image)               │ │
│  ├─ /app/node_modules                    │ │
│  ├─ /app/.next                           │ │
│  ├─ /app/public                          │ │
│  ├─ /app/package.json                    │ │
│  └─ System binaries (Alpine Linux)       │ │
│                                          │ │
│  ┌────────────────────────────────────────┐ │
│  │  Process                               │ │
│  │  └─ npm start                          │ │
│  │     └─ next start                      │ │
│  │        └─ node server on port 3000   │ │
│  │                                       │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Network                               │ │
│  │  Port Mapping: 3000 (container)        │ │
│  │              → 3000 (host)            │ │
│  │              → browser http://        │ │
│  │                localhost:3000        │ │
│  │                                       │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Storage (Volumes)                     │ │
│  │  ├─ /app/node_modules (named vol)     │ │
│  │  └─ Local state (localStorage in app) │ │
│  │                                       │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  User: nextjs (UID 1001, not root)         │
│                                              │
└──────────────────────────────────────────────┘
```

---

## docker-compose.yml Configuration

```
docker-compose.yml
    │
    ├─ version: 3.8 (latest stable)
    │
    └─ services:
        └─ privacy-tracker:
            │
            ├─ build:
            │   ├─ context: . (build from root)
            │   └─ dockerfile: Dockerfile
            │
            ├─ container_name: privacy-tracker-app
            │
            ├─ ports:
            │   └─ "3000:3000" (expose to host)
            │
            ├─ environment:
            │   └─ NODE_ENV=production
            │
            ├─ restart: unless-stopped
            │   (auto-restart if crashes)
            │
            ├─ healthcheck:
            │   ├─ test: wget http://localhost:3000
            │   ├─ interval: 30s
            │   └─ retries: 3
            │
            ├─ volumes:
            │   └─ /app/node_modules (named volume)
            │       (prevents npm package conflicts)
            │
            └─ deploy:
                └─ resources:
                    ├─ limits:
                    │   ├─ cpus: '1'
                    │   └─ memory: 512M
                    └─ reservations:
                        ├─ cpus: '0.5'
                        └─ memory: 256M
```

---

## Script Automation

```
docker-helper.sh / docker-helper.bat
    │
    ├─ Helper functions:
    │   ├─ build → docker build
    │   ├─ run → docker run
    │   ├─ stop → docker stop
    │   ├─ logs → docker logs -f
    │   ├─ push → docker push (Docker Hub)
    │   ├─ save → docker save (export tar)
    │   ├─ load → docker load (import tar)
    │   ├─ clean → remove container+image
    │   └─ ...more
    │
    ├─ Colored output for clarity
    │
    └─ Usage:
        bash docker-helper.sh build
        bash docker-helper.sh run-dev
        etc.
```

---

## Complete Workflow Example

```
Step 1: Developer Writes Code
    app/src/components/MyComponent.js
                │
Step 2: Build Production Image
    docker-compose up --build
                │
Step 3: Test Locally
    http://localhost:3000 (works perfectly)
                │
Step 4: Push to Docker Hub
    docker-helper.sh push hafsa993
                │
Step 5: Share with Friends
    "docker run -p 3000:3000 hafsa993/privacy-tracker:1.0"
                │
                ▼
    Friend's Machine (Windows/Mac/Linux)
    Friend runs command
    ├─ Docker pulls image (350MB)
    ├─ Starts container
    └─ App runs at http://localhost:3000 ✓
    
    No npm install needed!
    No Node.js installation needed!
    No troubleshooting needed!
```

---

## Environment: Development vs Production

```
┌──────────────────────────────────────┐
│   NOT COMMITTED (git ignore)         │
├──────────────────────────────────────┤
│ .env                                 │
│ .env.*.local                         │
│ tar files (exported images)          │
│ node_modules (built in container)    │
│ .next (built in container)           │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│   COMMITTED (in git repo)            │
├──────────────────────────────────────┤
│ Dockerfile                           │
│ Dockerfile.dev                       │
│ .dockerignore                        │
│ docker-compose.yml                   │
│ docker-compose.dev.yml               │
│ .env.production (not secrets!)       │
│ DOCKER.md                            │
│ docker-helper.sh/.bat                │
└──────────────────────────────────────┘
```

---

**This diagram shows how all pieces work together to build, run, and distribute your Privacy Tracker application! 📦🐳**
