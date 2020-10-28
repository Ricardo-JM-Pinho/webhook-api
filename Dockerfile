FROM node:12-slim

WORKDIR /workspace

COPY . .

RUN yarn install
RUN yarn tsc

CMD yarn start
