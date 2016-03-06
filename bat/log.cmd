@echo off

SET currentPath = %cd%"
set /p root=<"fb.config"

FOR /f "skip=1 delims=" %%c IN (fb.config) DO (
	tortoiseGitProc -command log -path %root%%%c
)
cd %currentPath%

pause
