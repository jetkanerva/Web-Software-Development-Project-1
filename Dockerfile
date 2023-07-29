FROM denoland/deno:alpine-1.29.2

EXPOSE 7777

WORKDIR /app

COPY deps.js .

RUN deno cache deps.js

COPY . .

CMD ["sh", "-c", "ulimit -n 4096 && deno run --unstable --watch --allow-net --allow-read --allow-env --no-check app.js"]