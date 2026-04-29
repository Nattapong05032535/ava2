# Dockerfile (production - multi-stage)
FROM node:20.12.2-alpine AS development
RUN apk add --no-cache python3 make g++
WORKDIR /usr/src/app
COPY ./package.json ./pnpm-lock.yaml ./tsconfig.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

FROM node:20.12.2-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/pnpm-lock.yaml ./
COPY --from=development /usr/src/app/.next ./.next
COPY --from=development /usr/src/app/public ./public
RUN npm install -g pnpm && pnpm install --prod
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
CMD ["pnpm","start"]
