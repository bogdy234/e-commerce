import os
import argparse

def show_help():
    print("""
    Script to start the app

    How to use: python start_app.py [-build|-start|-stop|-restart|-up]"
    Options:
    -build    Build all the images on docker
    -build_backend  Build only backend image
    -build_frontend Build only frontend image
    -build_db   Build only db image
    -start    Start the image on docker
    -stop     Stop the image on docker
    -restart    Restart the image on docker
    -up    Start the image (Used after build)
    """)

def build_project():
    os.system("cd backend/ && docker-compose build")

def build_project_backend():
    os.system("cd backend/ && docker-compose build app")

def build_project_frontend():
    os.system("cd backend/ && docker-compose build frontend")

def build_project_db():
    os.system("cd backend/ && docker-compose build db")

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
parser.add_argument("-build_backend","-build_backend",const="build", action="store_const",default=None)
parser.add_argument("-build_frontend","-build_frontend",const="build", action="store_const",default=None)
parser.add_argument("-build_db","-build_db",const="build", action="store_const",default=None)
parser.add_argument("-start","-start",const="start", action="store_const",default=None)
parser.add_argument("-stop","-stop",const="stop", action="store_const",default=None)
parser.add_argument("-restart","-restart",const="restart", action="store_const",default=None)
parser.add_argument("-up","-up",const="up", action="store_const",default=None)
parser.add_argument("-help","-help",const="show_help", action="store_const",default=None)

args = parser.parse_args()
build = args.build
build_backend = args.build_backend
build_frontend = args.build_frontend
build_db = args.build_db
start = args.start
stop = args.stop
restart = args.restart
up = args.up
helper = args.help

if helper:
    show_help()
if build:
    build_project()
if build_backend:
    build_project_backend()
if build_frontend:
    build_project_frontend()
if build_db:
    build_project_db()
if start:
    start_project()
if stop:
    stop_project()
if restart:
    restart_project()
if up:
    up_project()
