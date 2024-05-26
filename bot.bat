@echo off

rem Function definitions
:start
    rem Clean the old build
    rmdir /s /q dist 2>nul
    rem Convert TypeScript code to JavaScript code
    tsc
    rem Run the code
    node dist/index.js
    goto :eof

:dev
    rem Clean the old build
    rmdir /s /q dist 2>nul
    rem Convert TypeScript code to JavaScript code
    tsc
    rem Run the code with nodemon
    nodemon dist/index.js
    goto :eof

:clean
    rem Clean the old build
    rmdir /s /q dist 2>nul
    goto :eof

:help
    rem Print the possible options
    echo ##[ Possible options]##:
    rem Start option
    echo "- start:"
    echo "clean the old build and rebuild the ts code to js code and run"
    rem Clean option
    echo "- clean:"
    echo "clean the JavaScript build"
    goto :eof

:default
    rem Print the possible options
    echo # Possible options:
    echo "start, clean, help"
    goto :eof

rem Get the argument from the prompt
set "opt=%~1"

rem Switch case
if "%opt%"=="start" goto :start
if "%opt%"=="run" goto :start
if "%opt%"=="--start" goto :start
if "%opt%"=="--run" goto :start
if "%opt%"=="clean" goto :clean
if "%opt%"=="clear" goto :clean
if "%opt%"=="--clean" goto :clean
if "%opt%"=="--clear" goto :clean
if "%opt%"=="help" goto :help
if "%opt%"=="--help" goto :help
if "%opt%"=="-h" goto :help

rem If none of the recognized options are provided
goto :default
