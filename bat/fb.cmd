@echo off

SET currentPath = %cd%"
set /p root=<"fb.config"

FOR /f "skip=1 delims=" %%c IN (fb.config) DO (
	cd %root%%%c
	git.exe fetch -v --progress "origin"
	tortoiseGitProc -command rebase  -path %root%%%c
)
cd %currentPath%

pause
