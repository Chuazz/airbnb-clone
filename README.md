# Project Name

## System requirements
 - Docker

 - NodeJs v20.11.1 or higher

 - Yarn v1.22.21 or higher

## Server config
 - `cd back-end/`

 - update docker-compose.yml file

 - `cp .env.example .env`

 - update .env file

 - `docker compose up`

## Web Config
 - `cd ../front-end`

 - `cp .env.example .env`

 - update .env file

 - update environment.d.ts if you want to use typescript

## Server extensions
 - move to each extensions in extensions folder 

 - eg. cd back-end/extensions/update-model-folder

 - `yarn install`

## Start server
 - `yarn server-restart`
 - run at http://localhost:8055

## Start web
 - `yarn dev`
 - run at http://localhost:3000

## Start extension 
 - cd back-end/extensions/extensions-name
 - `yarn dev`