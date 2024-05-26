#!/bin/sh

# function definitions
start(){
    # clean the old build
    rm -rf dist
    # the ts code to js code
    tsc
    # run the code
    node dist/index.js
}

dev(){
    # clean the old build
    rm -rf dist
    # the ts code to js code
    tsc
    # run the code
    nodemon dist/index.js
}

clean(){
    # clean the old build
    rm -rf dist
}

help(){
    # print the possible options
    echo "##[ Possible options]##:"
    # start option
    echo "- start:"
    echo "clean the old build and rebuild the ts code to js code and run"
    # clean option
    echo "- clean:"
    echo "clean the javascript build"
}

default(){
    # print the possible options
    echo "# Possible options:"
    echo "start, clean, help"
}


# get the args after from the prompt
opt=$1

# switch case
case $opt in
    "start"|"run"|"--start"|"--run")
        start
        ;;
    "clean"|"clear"|"--clean"|"--clear")
        clean
        ;;
    "help"|"--help"|"-h")
        help
        ;;
    *)
        default
        ;;
esac

