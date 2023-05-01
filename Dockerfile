#FROM node:latest as angular
#WORKDIR /app
#COPY package.json /app
#RUN npm install --silent
#COPY . .
#RUN npm run build
#
#FROM nginx:alpine
#VOLUME /var/cache/nginx
#COPY --from=angular app/dist/front-blog /usr/share/nginx/html
#COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
RUN mkdir /etc/nginx/ssl
COPY --from=angular app/dist/front-blog /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./config/alphasslcasha256g4.crt /etc/nginx/ssl/seu-certificado.crt
COPY ./config/blog.key /etc/nginx/ssl/sua-chave.key


