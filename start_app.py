import os
import argparse

def show_help():
    print("""
    Script to start the app

    How to use: python start_app.py [-build|-start|-stop|-restart|-up]"
    Options:
    -build    Build the images on docker
    -start    Start the image on docker
    -stop     Stop the image on docker
    -restart    Restart the image on docker
    -up    Start the image (Used after build)
    """)

def build_project():
    os.system("cd backend/ && docker-compose build")

def start_project():
    os.system("cd backend/ && docker-compose start")

def stop_project():
    os.system("cd backend/ && docker-compose stop")

def restart_project():
    os.system("cd backend/ && docker-compose restart")

def up_project():
    os.system("cd backend/ && docker-compose up")
    
parser = argparse.ArgumentParser(description="Put the argument")
parser.add_argument("-build","-build",const="build", action="store_const",default=None)
parser.add_argument("-start","-start",const="start", action="store_const",default=None)
parser.add_argument("-stop","-stop",const="stop", action="store_const",default=None)
parser.add_argument("-restart","-restart",const="restart", action="store_const",default=None)
parser.add_argument("-up","-up",const="up", action="store_const",default=None)
parser.add_argument("-help","-help",const="show_help", action="store_const",default=None)

args = parser.parse_args()
build = args.build
start = args.start
stop = args.stop
restart = args.restart
up = args.up
helper = args.help

if helper:
    show_help()
if build:
    build_project()
if start:
    start_project()
if stop:
    stop_project()
if restart:
    restart_project()
if up:
    up_project()
