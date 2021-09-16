FROM node:alpine

EXPOSE 8080

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . ./

# RUN yarn run knex migrate:latest

CMD ["yarn", "start"]
