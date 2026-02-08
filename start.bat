@echo off
echo 🎯 Starting HobbyTrack...
echo.

echo 🚀 Starting backend server...
start cmd /k "cd server && npm install && npm start"

timeout /t 3 /nobreak > nul

echo 🎨 Starting frontend...
start cmd /k "cd client && npm install && npm run dev"

echo.
echo ✅ HobbyTrack is starting!
echo.
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo Press any key to exit...
pause > nul
