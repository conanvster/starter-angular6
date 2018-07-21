FROM node:carbon

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
EXPOSE 4200 49153

