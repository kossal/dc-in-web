FROM node:14.2.0

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "server/" ]

EXPOSE 3000