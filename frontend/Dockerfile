FROM node:latest
RUN mkdir -p /usr/parking-app-frontend
WORKDIR /usr/parking-app-frontend
COPY . /usr/parking-app-frontend
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]