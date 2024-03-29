FROM node:14-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
RUN npm cache clean --force
COPY . .
RUN npm run build -- --base-href /


# Stage 2 - Run
FROM nginx:alpine
VOLUME /var/cache/nginx
RUN mkdir /etc/nginx/ssl
COPY --from=angular /app/dist/front-blog /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./config/blog.crt /etc/nginx/ssl/blog.crt
COPY ./config/blog.key /etc/nginx/ssl/sua-chave.key
COPY ./config/robots.txt /usr/share/nginx/html/robots.txt
COPY ./config/ads.txt /usr/share/nginx/html/ads.txt
COPY ./config/sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY ./config/manifest.json /usr/share/nginx/html/manifest.json
COPY ./config/service-worker.js /usr/share/nginx/html/service-worker.js

