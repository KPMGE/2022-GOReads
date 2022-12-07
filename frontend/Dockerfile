FROM node:lts as dependencies
WORKDIR /goreads
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /goreads
COPY . .
COPY --from=dependencies /goreads/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /goreads
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /goreads/next.config.js ./
COPY --from=builder /goreads/public ./public
COPY --from=builder /goreads/.next ./.next
COPY --from=builder /goreads/node_modules ./node_modules
COPY --from=builder /goreads/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
