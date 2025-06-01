@echo off
echo Cleaning .next directory...

:: Try to delete .next directory
if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next 2>nul
    
    :: If it fails, try to kill node processes first
    if exist .next (
        echo Killing Node processes...
        taskkill /F /IM node.exe 2>nul
        timeout /t 2 /nobreak >nul
        rmdir /s /q .next 2>nul
    )
)

:: Clean other cache directories
if exist node_modules\.cache (
    echo Removing node_modules cache...
    rmdir /s /q node_modules\.cache 2>nul
)

echo Done! You can now run: npm run dev
pause 