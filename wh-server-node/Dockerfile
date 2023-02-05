FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
RUN npm i -g nodemon
RUN npm i -g ts-node
COPY . .

EXPOSE 3000

CMD ["npm", "run", "prod"]

