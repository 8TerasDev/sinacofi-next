# Getting Started

Open a terminal in the directory where you are going to work.

## 1. Get Repository

Run next command to have repo in the `local`

    git clone https://SinacofiSA@dev.azure.com/SinacofiSA/Beneficiario_Final/_git/BF_Web_App

Then run

    cd BF_Web_App

## 2. Prepair .env variables

Go to `.env` file and open it. It should be edited. This file should have 
- The base path of `webApp`: `BASE_PATH`. 
- The url of `database`: `DATABASE_URL`.
The file `.env` has an example of the case. But the next lines shows what information should contain to `postgres` database:

    BASE_PATH="/path_where_home_webapp_will_be"
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"

For more information: [link](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql)



## 2.Development environment

### 2.1 Install dependencies

Install dependencies running following line
    
    yarn install

### 2.2 Get Database with Prisma

Run following command

    npx prisma generate

### 2.3 Run App 

    yarn dev

### 2.4 Open App

Open http://localhost:3000/BASE_PATH where `BASE_PATH` should be exact the same that was defined before in `.env`. Then, you can see the app running.


## 3. Production environment

### 3.1 Build

Run following command to build
      
    yarn build

### 3.2 Run WebApp

Run following command

    yarn start

### 3.3 Open App 

Open http://localhost:3000/BASE_PATH where `BASE_PATH` should be exact the same that was defined before in `.env`. Then, you can see the app running.

### 3.4 Files builed

The files are in `.next` folder


### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## 4. Docker Environment

### 4.1 Run and build docker
Run following command to build and run docker container. 

    docker-compose up -d --build

### 4.2 Open App 

Open http://localhost:8081/BASE_PATH where `BASE_PATH` should be exact the same that was defined before in `.env`. Then, you can see the app running.