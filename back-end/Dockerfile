FROM node:18

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run jwt-key
RUN npm run db

EXPOSE 3001

# Run the app
CMD ["npm", "run", "dev"]
