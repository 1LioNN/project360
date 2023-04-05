#BUILD REACT APP
FROM node:14-alpine3.14 as build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . .

RUN npm run build

#SERVE REACT APP WITH NGINX
FROM nginx:1.21.6-alpine 
COPY --from=build  /usr/src/app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




