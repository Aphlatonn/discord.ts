#!/bin/sh

# function definitions
start(){
    # clean the old build
    rm -rf dist
    # compile the ts code to js code
    tsc
    # run the code
    node dist/index.js
}

dev(){
    # clean the old build
    rm -rf dist
    # compile the ts code to js code
    tsc
    # run the code
    nodemon dist/index.js
}

build(){
    # clean the old build
    rm -rf dist
    # compile the ts code to js code
    tsc
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
    # dev option
    echo "- dev:"
    echo "run the code using nodemon"
    # build option
    echo "- build:"
    echo "compile the ts code to js code"
    # clean option
    echo "- clean:"
    echo "clean the javascript build"
}

default(){
    # print the possible options
    echo "# Possible options:"
    echo "start, dev, build, clean, help"
}


# get the option from the user
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

