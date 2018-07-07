FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

# Install dependencies
RUN npm install

## Build
RUN [ "npm", "run", "build" ]

# Run prod server so exit signals such as SIGTERM and SIGINT are recieved by
# node process instead of being swallowed by npm
ENTRYPOINT [ "node", "dist/index.js" ]
