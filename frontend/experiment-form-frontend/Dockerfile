FROM node:12-alpine

WORKDIR /app/app-ui

# copy contents of local directory inside container working directory
COPY . ./

# installing angular cli globally to be able to use angular cli commands.
RUN npm install -g @angular/cli@9.0.4 && npm install

EXPOSE 4200

# CMD ng serve -o --port 4201
CMD ["ng", "serve", "--host=0.0.0.0","--port", "4200"]
