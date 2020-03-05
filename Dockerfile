# Stage 1 : build the app
FROM node:13.8-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 : start the app with nginx
FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/app/dist/progeser-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN ["nginx"]
