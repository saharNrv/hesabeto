FROM node:lts as dependencies
WORKDIR /account-type
COPY package.json ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /account-type
COPY . .
COPY --from=dependencies /account-type/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /account-type
# if you are using a custom next.config.js file , on comment this line.
# COPY --from=builder /account-type/next.config.mjs ./
COPY --from=builder /account-type/public ./public
COPY --from=builder /account-type/.next ./.next
COPY --from=builder /account-type/node_modules ./node_modules
COPY --from=builder /account-type/package.json ./package.json

EXPOSE 3010
CMD ["yarn", "start", "-p", "3010"]