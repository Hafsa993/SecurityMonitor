# Docker Quick Start Guide

Get your Privacy Tracker running in Docker in 5 minutes!

## Prerequisites

Install Docker: https://docs.docker.com/get-docker/

Verify installation:
```bash
docker --version
docker-compose --version
```

---

## Option 1: Easiest - Docker Compose (Recommended)

### Step 1: Navigate to Project Root
```bash
cd c:\GitHub\SecurityMonitor
```

### Step 2: Start the App
```bash
docker-compose up --build
```

**First time:** ~2-3 minutes (downloads dependencies)
**Subsequent times:** ~30 seconds (uses cache)

### Step 3: Open Your Browser
```
http://localhost:3000
```

Done! 🎉

### To Stop
Press `Ctrl+C` in terminal

---

## Option 2: Using Helper Script (Windows)

### Step 1: Open Command Prompt or PowerShell
Navigate to project root:
```bash
cd c:\GitHub\SecurityMonitor
```

### Step 2: Build
```bash
docker-helper.bat build
```

### Step 3: Run
```bash
docker-helper.bat run
```

### Step 4: Open Browser
```
http://localhost:3000
```

---

## Option 3: Using Helper Script (Mac/Linux)

### Step 1: Open Terminal
```bash
cd ~/path/to/SecurityMonitor
```

### Step 2: Make script executable
```bash
chmod +x docker-helper.sh
```

### Step 3: Build
```bash
./docker-helper.sh build
```

### Step 4: Run
```bash
./docker-helper.sh run
```

### Step 5: Open Browser
```
http://localhost:3000
```

---

## Option 4: Manual Docker Commands

### Step 1: Build Image
```bash
docker build -t privacy-tracker:1.0 .
```

### Step 2: Run Container
```bash
docker run -p 3000:3000 privacy-tracker:1.0
```

### Step 3: Open Browser
```
http://localhost:3000
```

---

## Development with Hot Reload

Want code changes to automatically reload?

### Using Docker Compose (Easiest)
```bash
docker-compose -f docker-compose.dev.yml up --build
```

Edit `app/src/` files, changes appear automatically in browser!

### Using Helper Script
**Windows:**
```bash
docker-helper.bat run-dev
```

**Mac/Linux:**
```bash
./docker-helper.sh run-dev
```

---

## Common Tasks

### Check Running Containers
```bash
docker ps
```

### View Logs
```bash
docker logs -f privacy-tracker-app
```

### Stop Container
```bash
# With Compose:
docker-compose down

# Or manually:
docker stop privacy-tracker-app
```

### Remove Everything
```bash
docker-compose down
docker rmi privacy-tracker:1.0
```

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
docker run -p 8000:3000 privacy-tracker:1.0
# Access at http://localhost:8000
```

### Container Crashes
```bash
# Check logs
docker logs privacy-tracker-app
```

### Build Errors
```bash
# Try building without cache
docker build --no-cache -t privacy-tracker:1.0 .
```

---

## File Reference

All Docker files created:

- **Dockerfile** - Production image
- **Dockerfile.dev** - Development image
- **.dockerignore** - Build optimization
- **docker-compose.yml** - Production setup
- **docker-compose.dev.yml** - Development setup
- **docker-helper.sh** - Mac/Linux commands
- **docker-helper.bat** - Windows commands
- **DOCKER.md** - Full documentation
- **DOCKER_ARCHITECTURE.md** - Technical diagrams
- **.env.production** - Environment config

---

## Next Steps

1. **Try it**: `docker-compose up --build`
2. **Test dev mode**: `docker-compose -f docker-compose.dev.yml up --build`
3. **Share an image**: `docker save privacy-tracker:1.0 -o file.tar`
4. **Push to Docker Hub**: `docker-helper.bat push yourusername`
5. **Read full docs**: See DOCKER.md

---

## Success Checklist

- [ ] Docker installed (`docker --version` works)
- [ ] You're in project root (`app/` folder visible)
- [ ] Run `docker-compose up --build`
- [ ] App appears at http://localhost:3000
- [ ] Permissions slider works
- [ ] Try development mode: `docker-compose -f docker-compose.dev.yml up`
- [ ] Edit code, see changes in browser

**You're done!** Your app is now containerized. 🐳✨
