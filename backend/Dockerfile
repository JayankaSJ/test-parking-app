FROM node:latest
RUN mkdir -p /usr/parking-app-backend
WORKDIR /usr/parking-app-backend
COPY . /usr/parking-app-backend
RUN npm install
EXPOSE 8001
CMD ["npm", "start"]