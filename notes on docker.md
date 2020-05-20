# Images and Containers

Fundamentally, a container is nothing but a running process, with some added encapsulation features applied to it in order to keep it isolated from the host and from other containers. One of the most important aspects of container isolation is that each container interacts with its own private filesystem; this filesystem is provided by a Docker image. An image includes everything needed to run an application - the code or binary, runtimes, dependencies, and any other filesystem objects required.

> So first we compile a Docker image, then we run it in a container.

Useful commands are:

```sh
docker --version
sudo dockerd # To enable docker
sudo docker run hello-world # To check that it's correctly installed
docker image ls # List all images
docker ps # List running containers
docker ps --all # History of running containers this session
docker login
```

# Dockerfile

This file will give the instructions necessary to setup a image. The following is a simple example:

```docker
# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory. (Inside image filesystem)
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run the specified command within the container to start app
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
```

## Build image

```sh
sudo docker build -t hello-world .
```

Start a container exposing ports with:

```docker
docker run --rm --publish 8000:8080 --detach --name bb bulletinboard:1.0
docker run --rm --publish 8000:8080 --detach --restart unless-stopped --name bb bulletinboard:1.0
docker run --publish 3000:3000 --restart unless-stopped --name dogs-cats-app kossal/dc-in-web:0.1.0
docker run --publish 80:3000 --detach --restart unless-stopped --name dogs-cats-app kossal/dc-in-web:0.1.0
```
> rm: docker will erase all trace of the container once exited
> publish: forward traffic from port 8000 to port 8080 of container
> detach: run in background
> name: short name to refer to container
> bulletingboard:1.0 is the name of the image

Stop or remove the container with:

```docker
docker stop bb
docker rm --force bb
```

# Pushing to dockerhub

First tag correctly your image, then push it:

```docker
docker tag bulletinboard:1.0 kossal/bulletingboard:1.0
docker push kossal/bulletingboard:1.0
```

# Multi-stage build

You can combine multiple images and stage builds for all of them.

```docker
FROM golang:1.7.3 as backend
WORKDIR /backend
RUN go get -d -v golang.org/x/net/html  
COPY app.go .
RUN  #install some stuff, compile assets....

FROM golang:1.7.3 as assets
WORKDIR /assets
RUN ./getassets.sh

FROM nodejs:latest as frontend 
RUN npm install
WORKDIR /assets
COPY --from=assets /asets .
CMD ["./app"] 

FROM alpine:latest as mergedassets
WORKDIR /root/
COPY --from=merge ./
COPY --from=backend ./backend .
CMD ["./app"]
```