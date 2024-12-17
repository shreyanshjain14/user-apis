# User Management System with Authentication and Role-Based Access

## Overview
This project implements a User Management System with authentication and role-based access control (RBAC). The system provides APIs for user registration, login and management of user roles and permissions. The roles supported are **admin**, **editor**, and **viewer**. Additionally, admin-only functionality is provided for managing user roles.

## Technologies Used
- **NestJS** - Backend framework(Mono-repo setup)
- **RabbitMQ** - Message broker for handling background jobs
- **PostgreSQL** - Database for user information
- **Docker** - For containerization and running RabbitMQ
- **JWT** - For authentication and securing APIs
- **TypeScript** - For strong typing

## Setup Instructions

### Prerequisites
1. **Docker**: Ensure Docker is installed and running on your machine. You can download Docker from [here](https://www.docker.com/products/docker-desktop).
2. **Node.js**: Make sure Node.js (version 18 or later) is installed. You can download it from [here](https://nodejs.org/).
3. **PostgreSQL**: Make sure you have a running PostgreSQL instance or use Docker to run one.
4. **RabbitMQ**: RabbitMQ is used for job processing. You can run it using Docker as shown below.

### Step 1: Running RabbitMQ with Docker
To manage job queues efficiently, start RabbitMQ using Docker. Follow these steps:

Ensure that Docker Engine is running on your system.
Execute the following command to create and run a RabbitMQ container

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

```
### Step 2: Access RabbitMQ Management UI:

Open your browser and navigate to http://localhost:15672/#/.
Log in with the following default credentials:
Username: guest
Password: guest
Upon successful login, you should see the RabbitMQ Management UI.


### Step 3: Install PM2
PM2 is a process manager for Node.js applications, used to manage and monitor multiple processes:

Run the following command globally to install PM2:

npm install -g pm2

### Step 4: Start the Development Server
Open a terminal window and start the development server:

npm run start:dev

### Step 5: Run PM2 to Manage All Applications
Open another terminal window.
Run the following command to use PM2 for managing your applications:
npm run start:all:dev
This command utilizes the configuration in dev.ecosystem.config.js to start the apps on different ports. You can check the package.json file for details on how the script is defined.
use
use the pm2 commands to see the server logs
for ex:
pm2 logs
pm2 log 1 (id)

# Document Management APIs with AWS S3 Integration

This section outlines the implementation of APIs for managing documents, including uploading, retrieving, updating, and deleting documents. The application uses AWS S3 for storing files and integrates with NestJS for handling the backend logic.

## API Overview
The APIs provide the following functionalities:
- Generate a pre-signed URL for uploading documents to S3.
- Retrieve a list of documents.
- Update document metadata.
- Delete documents.

## Implementation Details

### AWS S3 Integration
We utilize AWS S3 for secure and scalable file storage. The integration includes:
1. Generating pre-signed URLs for uploading files directly to S3.
2. Configuring AWS SDK with the necessary credentials.

#### Environment Variables
Add the following variables to your `.env` file:
```env

APP_AWS_REGION=your-region
AWS_S3_BUCKET_NAME=your-bucket-name

```


## Environment Variables for Database Configuration

To set up the database configuration for the project, the following environment variables are required. These variables will be used to connect to a PostgreSQL database for storing document metadata and other related information.

### Database Configuration Variables

```env
# Database Type
DB_TYPE=pg

# Database Host (hostname or IP address of the PostgreSQL server)
DB_HOST=localhost

# Database Port (default PostgreSQL port is 5432)
DB_PORT=5432

# Database Username (the PostgreSQL user for authentication)
DB_USER=postgres

# Database Password (password for the specified PostgreSQL user)
DB_PASSWORD=password

# Database Name (the name of the database to connect to)
DB_DATABASE=documents

# Enable or Disable Debug Mode for Database Queries
# 0 = Disabled, 1 = Enabled (useful for development to log SQL queries)
DB_DEBUG=0

```

### Setup Instructions
Create a .env file in the root directory of the project if it does not already exist.
Add the above environment variables to the .env file with the appropriate values.
Ensure that PostgreSQL is installed and running locally or on a remote server.
Make sure the specified database (documents) exists or create it manually if necessary.
The application will use these environment variables to establish a connection to the PostgreSQL database.
This setup allows the application to connect to the PostgreSQL database, perform operations, and manage documents.


### Queries
shreyanshjain2053@gmail.com


