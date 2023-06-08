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


## Stage 1 - Build Angular app
#FROM node:14-alpine as angular
#WORKDIR /app
#COPY package.json /app
#RUN npm install --silent
#RUN npm cache clean --force
#COPY . .
#RUN npm run build
#
## Stage 2 - Setup Express server
#FROM node:14-alpine as express
#WORKDIR /app
#COPY --from=angular /app/dist/front-blog /app
#COPY /src/server.js /app
#RUN npm install express connect-history-api-fallback
#
## Stage 3 - Run with Nginx
#FROM nginx:alpine
#VOLUME /var/cache/nginx
#RUN mkdir /etc/nginx/ssl
#COPY --from=express /app /usr/share/nginx/html
#COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
#COPY ./config/blog.crt /etc/nginx/ssl/blog.crt
#COPY ./config/blog.key /etc/nginx/ssl/sua-chave.key
#COPY ./config/robots.txt /usr/share/nginx/html/robots.txt
#COPY ./config/sitemap.xml /usr/share/nginx/html/sitemap.xml
#COPY ./config/ads.txt /usr/share/nginx/html/ads.txt
#COPY ./config/manifest.json /usr/share/nginx/html/manifest.json
#COPY ./config/service-worker.js /usr/share/nginx/html/service-worker.js
#CMD ["nginx", "-g", "daemon off;"]
