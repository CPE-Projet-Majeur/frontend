# ------------------ BUILD -----------------------
FROM node:18-alpine3.17 AS build
WORKDIR /app

COPY ./dueling-wands/package.json .
# COPY ./dueling-wands/package-lock.json .
COPY ./dueling-wands/tsconfig*.json .
COPY ./dueling-wands/vite.config.ts .
COPY ./dueling-wands/index.html .
COPY ./dueling-wands/src ./src
COPY ./dueling-wands/public ./public

#RUN npm install
#RUN npm run build TODO : add ts compilation : npx tsc -b
RUN npm install
RUN npx vite build

# ------------------ PROXY ----------------------
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template

RUN apk add --no-cache gettext
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 8080
CMD ["/docker-entrypoint.sh"]