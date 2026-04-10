FROM node:24-alpine

# Alpine uses apk, not apt. build-base ≈ build-essential (for native addons / node-gyp).
RUN apk add --no-cache build-base python3

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "exec", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
