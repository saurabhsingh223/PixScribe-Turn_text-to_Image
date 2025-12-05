@echo off
echo ========================================
echo    Starting PixScribe
echo ========================================
echo.
echo [1/3] Stopping any existing servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul
echo.
echo [2/3] Starting Proxy Server (Port 3001)...
start "PixScribe Proxy Server" cmd /k "cd /d %~dp0 && npm run server"
timeout /t 3 /nobreak >nul
echo.
echo [3/3] Starting Frontend Dev Server (Port 5173)...
start "PixScribe Frontend" cmd /k "cd /d %~dp0 && npm run dev"
echo.
echo ========================================
echo    Both servers are starting!
echo ========================================
echo.
echo Proxy Server: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Chrome will open automatically in a few seconds...
echo.
echo IMPORTANT: Keep both command windows open!
echo.
echo ========================================
timeout /t 3 /nobreak >nul
start chrome http://localhost:5173
echo.
pause
