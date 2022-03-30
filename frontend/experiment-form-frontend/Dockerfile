FROM node:12-alpine

WORKDIR /app/app-ui

ADD package*.json ./app/app-ui

# RUN npm cache verify

RUN npm install -g @angular/cli@9.0.4

RUN npm install -g

ADD . /app/app-ui
    
EXPOSE 4200

# CMD ng serve -o --port 4201
CMD ["ng", "serve", "--host=0.0.0.0","--port", "4200"]