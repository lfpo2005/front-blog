FROM node:14-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
RUN npm cache clean --force
COPY . .
RUN npm run build

# Stage 2 - Run
FROM nginx:alpine
VOLUME /var/cache/nginx
RUN mkdir /etc/home/ssl
COPY --from=angular /app/dist/front-blog /usr/share/nginx/html
COPY ./config/nginx.conf /etc/home/conf.d/default.conf
COPY ./config/blog.crt /etc/home/ssl/blog.crt
COPY ./config/blog.key /etc/home/ssl/sua-chave.key
COPY ./config/robots.txt /usr/share/home/html/robots.txt
COPY ./config/ads.txt /usr/share/home/html/ads.txt
COPY ./config/manifest.json /usr/share/home/html/manifest.json
COPY ./config/service-worker.js /usr/share/home/html/service-worker.js
