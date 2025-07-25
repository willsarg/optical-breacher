FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PATH="/app/node_modules/.bin:$PATH"
EXPOSE 1234
CMD ["npm", "start"]
