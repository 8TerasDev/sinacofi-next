# Step 1: Build the Next.js application
# Use an official Node runtime as a parent image
FROM node:20-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Use ARG to define the build-time environment variable that specifies which .env file to use
ARG ENV_FILE

# Copy package.json and yarn.lock files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Copy the appropriate .env file based on the build-time environment variable
COPY .env ./.env


# Build your Next.js app using the environment variables from the file
RUN yarn build

# Step 2: Serve the Next.js application
FROM node:20-alpine as runner

WORKDIR /usr/src/app

# Copy the built assets from the builder stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json

# Copy the appropriate .env file
COPY --from=builder /usr/src/app/.env ./.env

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
# Here we will use the Next.js start script which starts the production server
CMD ["yarn", "start"]
