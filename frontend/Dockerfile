FROM node:18-alpine

RUN apk add --no-cache make gcc g++ python3 cairo-dev jpeg-dev pango-dev giflib-dev
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]