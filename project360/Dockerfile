#BUILD REACT APP
FROM node:14-alpine3.14 as build
WORKDIR /usr/src/app
COPY project360/package.json ./
COPY project360/package-lock.json ./

RUN npm install --silent

COPY project360 ./

RUN npm run build


#SERVE REACT APP WITH NGINX
FROM nginx:1.21.6-alpine 
COPY --from=build  /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




