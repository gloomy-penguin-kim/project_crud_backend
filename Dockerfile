# Use a Node.js base image 
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . . 


# Expose the port your application listens on
EXPOSE 3005


# Start the application
CMD ["node", "app.js"]


# docker build -t webapp -f Dockerfile1 .
# 
# docker run --env-file .env -p 3001:3001 webapp

#kim@Ubuntu-HP-ProBook-445-G7:~/Documents/Projects/project_crud_backend$ docker tag webapp registry.heroku.com/gloomypenguin-project-crud/web
#kim@Ubuntu-HP-ProBook-445-G7:~/Documents/Projects/project_crud_backend$ docker push registry.heroku.com/gloomypenguin-project-crud/web
#Using default tag: latest
#The push refers to repository [registry.heroku.com/gloomypenguin-project-crud/web]
#0d772d9cf763: Pushed 
#6d5fcba322a9: Pushed 
#54cbafbc2109: Pushed 
#41c838670c69: Pushed 
#82140d9a70a7: Pushed 
#f3b40b0cdb1c: Pushed 
#0b1f26057bd0: Pushed 
#08000c18d16d: Pushed 
#latest: digest: sha256:64eab65fcbe9192b56304453eaf40f81d95da6528056a982c83e609f4815807a size: 1994
#kim@Ubuntu-HP-ProBook-445-G7:~/Documents/Projects/project_crud_backend$ heroku container:release web -a gloomypenguin-project-crud
#Releasing images web to gloomypenguin-project-crud... done
#kim@Ubuntu-HP-ProBook-445-G7:~/Documents/Projects/project_crud_backend$ 

