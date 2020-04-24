FROM node:14 AS BuildImage

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY .babelrc next.config.js next-env.d.ts tsconfig.json .eslintrc.json /app/
COPY src /app/src
RUN ./node_modules/.bin/eslint "src/**"
RUN npm run build

FROM node:14
COPY --from=BuildImage /app/package.json package.json
COPY --from=BuildImage /app/package-lock.json package-lock.json
COPY --from=BuildImage /app/.next .next

RUN npm install --only=prod

CMD npm run start
