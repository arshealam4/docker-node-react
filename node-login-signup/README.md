# node-login-signup-boilerplate

## Description

* In this app, we could do signup, login and get all user details with pagination, user details API is token protected, to get details we have to set token in header. 

## Technology

- [x] Node
- [x] Express
- [x] mongoose orm
- [x] Best Practice Structure
- [x] JWT middleware for authorization
- [x] Async Await
- [x] Docker

## Requirements

* to run this project, nodejs, mongodb and git (version control) should be installed.
* Node ^8

### node

* [Node](http://nodejs.org/) is really easy to install & now include NPM. You should be able to run the following command after the installation procedure below.

  $ node --version
  
  $ npm --version

### mongodb

* [MongoDB](https://docs.mongodb.com/manual/installation/) is really easy to install, click here [MongoDB](https://docs.mongodb.com/manual/installation/) and follow the step to install mongoDB.

### docker

* [Docker](https://docs.docker.com/install/) is really easy to install, click here [Docker](https://docs.docker.com/install/) and follow the step to install Docker.

## Quick Start

* We can run our project with docker or follow simple steps as given below(Run Project).

### Start docker

#### from docker hub
* docker pull ashe42/node-express-app
* docker run ashe42/node-express-app
* docker run --network=host ashe42/node-express-app /* run this, if not able to connect with mongo 27017, replace 127.0.0.1 to 0.0.0.0 in mongo conf */

or

#### from bit bucket
* git clone https://github.com/arshealam4/node-login-signup.git
* cd node-login-signup
* docker build -t "app-name" .
* sudo docker run "app-name"
* sudo docker run --network=host "app-name"  /* run this, if not able to connect with mongo 27017, replace 127.0.0.1 to 0.0.0.0 in mongo conf */

### Run Project 

* git clone https://github.com/arshealam4/node-login-signup.git
* cd node-login-signup
* npm install
* npm install -g nodemon

nodemon
