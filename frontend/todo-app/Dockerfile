FROM node:16-alpine 

WORKDIR /app
COPY . .

ARG REACT_APP_API_URL

# Install dependencies
RUN npm ci 
RUN npm run build

EXPOSE 3000

CMD [ "npx", "serve", "build" ]