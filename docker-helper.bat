@echo off
REM Helper script for common Docker commands (Windows version)
REM Usage: docker-helper.bat [command]

setlocal enabledelayedexpansion

set IMAGE_NAME=privacy-tracker
set IMAGE_TAG=1.0
set CONTAINER_NAME=privacy-tracker-app

if "%1"=="" (
  call :print_help
  exit /b 0
)

if "%1"=="build" (
  call :build
) else if "%1"=="build-dev" (
  call :build_dev
) else if "%1"=="run" (
  call :run_prod
) else if "%1"=="run-dev" (
  call :run_dev
) else if "%1"=="stop" (
  call :stop_container
) else if "%1"=="logs" (
  call :show_logs
) else if "%1"=="logs-tail" (
  call :show_logs_tail
) else if "%1"=="clean" (
  call :clean
) else if "%1"=="push" (
  call :push_hub %2
) else if "%1"=="save" (
  call :save_image %2
) else if "%1"=="load" (
  call :load_image %2
) else if "%1"=="shell" (
  call :open_shell
) else if "%1"=="test" (
  call :run_tests
) else if "%1"=="compose-up" (
  call :compose_up
) else if "%1"=="compose-down" (
  call :compose_down
) else if "%1"=="ps" (
  call :list_containers
) else if "%1"=="help" (
  call :print_help
) else (
  echo Unknown command: %1
  call :print_help
  exit /b 1
)

exit /b 0

:print_help
echo Privacy Tracker Docker Helper (Windows)
echo.
echo Usage: docker-helper.bat [command] [options]
echo.
echo Commands:
echo   build              Build production image
echo   build-dev          Build development image
echo   run                Run production container
echo   run-dev            Run development container with hot reload
echo   stop               Stop running container
echo   logs               Show container logs (real-time)
echo   logs-tail          Show last 50 log lines
echo   clean              Remove container and image
echo   push [username]    Push to Docker Hub
echo   save [filename]    Save image to tar file
echo   load [filename]    Load image from tar file
echo   shell              Open shell in running container
echo   test               Run tests in container
echo   compose-up         Use docker-compose up
echo   compose-down       Use docker-compose down
echo   ps                 List running containers
echo   help               Show this help message
echo.
echo Examples:
echo   docker-helper.bat build
echo   docker-helper.bat run
echo   docker-helper.bat push yourusername
echo   docker-helper.bat save privacy-tracker.tar
goto :eof

:build
echo Building production image: %IMAGE_NAME%:%IMAGE_TAG%
docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
echo Build complete!
echo Run with: docker run -p 3000:3000 %IMAGE_NAME%:%IMAGE_TAG%
goto :eof

:build_dev
echo Building development image: %IMAGE_NAME%:dev
docker build -f Dockerfile.dev -t %IMAGE_NAME%:dev .
echo Build complete!
goto :eof

:run_prod
echo Starting production container...
docker run -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%
echo App running at http://localhost:3000
goto :eof

:run_dev
echo Starting development container with hot reload...
docker-compose -f docker-compose.dev.yml up
goto :eof

:stop_container
echo Stopping container...
docker stop %CONTAINER_NAME% 2>nul
docker rm %CONTAINER_NAME% 2>nul
echo Container stopped
goto :eof

:show_logs
docker logs -f %CONTAINER_NAME%
goto :eof

:show_logs_tail
docker logs --tail 50 %CONTAINER_NAME%
goto :eof

:clean
echo Removing container and image...
docker stop %CONTAINER_NAME% 2>nul
docker rm %CONTAINER_NAME% 2>nul
docker rmi %IMAGE_NAME%:%IMAGE_TAG% 2>nul
echo Cleanup complete
goto :eof

:push_hub
if "%~1"=="" (
  echo Error: Docker Hub username required
  echo Usage: docker-helper.bat push yourusername
  exit /b 1
)
echo Pushing to Docker Hub...
docker login
docker tag %IMAGE_NAME%:%IMAGE_TAG% %~1/%IMAGE_NAME%:%IMAGE_TAG%
docker push %~1/%IMAGE_NAME%:%IMAGE_TAG%
echo Image pushed to %~1/%IMAGE_NAME%:%IMAGE_TAG%
goto :eof

:save_image
if "%~1"=="" (
  set "FILENAME=%IMAGE_NAME%.tar"
) else (
  set "FILENAME=%~1"
)
echo Saving image to %FILENAME%...
docker save %IMAGE_NAME%:%IMAGE_TAG% -o %FILENAME%
echo Image saved to %FILENAME%
echo Transfer and load with: docker load -i %FILENAME%
goto :eof

:load_image
if "%~1"=="" (
  echo Error: Filename required
  echo Usage: docker-helper.bat load [filename]
  exit /b 1
)
echo Loading image from %~1...
docker load -i %~1
echo Image loaded
goto :eof

:open_shell
docker exec -it %CONTAINER_NAME% sh
goto :eof

:run_tests
echo Running tests in container...
docker exec %CONTAINER_NAME% npm test
goto :eof

:compose_up
echo Starting with docker-compose...
docker-compose up --build
goto :eof

:compose_down
echo Stopping with docker-compose...
docker-compose down
goto :eof

:list_containers
docker ps -a
goto :eof
