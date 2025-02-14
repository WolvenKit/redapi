FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 3000 4443
CMD ["bun", "prod"]