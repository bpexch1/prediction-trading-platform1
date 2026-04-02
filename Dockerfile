FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001 3000

CMD ["npm", "start"]
