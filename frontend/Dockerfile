FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "run", "dev" ]