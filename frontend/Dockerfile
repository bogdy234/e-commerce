FROM node:14.18.1

# set working directory
WORKDIR /frontend

# add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# add app
COPY . ./

# start app
CMD ["yarn", "dev"]