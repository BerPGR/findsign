FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d

ARG SSL_FULLCHAIN
ARG SSL_PRIVKEY
COPY ${SSL_FULLCHAIN} /etc/ssl/certs/fullchain.pem
COPY ${SSL_PRIVKEY} /etc/ssl/private/privkey.pem

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
