FROM nginx:alpine

LABEL maintainer "Alexey Vakulich <alexey.vakulich@gmail.com>"

RUN mkdir -p /app

COPY ./build /app/
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
