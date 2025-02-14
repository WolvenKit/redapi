FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
RUN mkdir -p ./src/token
RUN mkdir -p ./src/certs
EXPOSE 3000 4443
CMD ["bun", "prod"]