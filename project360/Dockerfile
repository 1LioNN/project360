#BUILD REACT APP
FROM node:14-alpine3.14 as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

COPY . ./
RUN npm install --silent
RUN npm run build


#SERVE REACT APP WITH NGINX
FROM nginx:1.21.6-alpine 
COPY --from=build  /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




