## FINANCE BACKEND API ASSIGNMENT

This project is a finance backend system developed using Node.js,Express,and MongoDB.It includes authentication and role-based access control for managing financial records.

## LIVE API LINK : https://finance-backend-01.onrender.com

Tech stack used :
Node.js
express.js
MongoDb Atlas
JWT Authentication
bcrypt

## Features:

User Registration & Login
JWT Authentication
Role-Based Access Control (Admin, Analyst, Viewer)
CRUD Operations for Records
Protected Routes

## Roles

- Admin → Full access
- Analyst→ Create & view
- Viewer → Read-only

API Routes

## Auth

POST-- /api/auth/register
POST-- /api/auth/login

## Records

- POST-- /api/records
- GET-- /api/records
- PUT-- /api/records/:id
- DELETE-- /api/records/:id

How to Run Locally

**bash**
git clone https://github.com/Junaidm678/finance-backend.git IF u will get any error here then connect with mobile hotspot and then try..
cd finance-backend
npm install


Create .env file:

MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
PORT=5000


How to Setup MongoDB Atlas
Go to https://www.mongodb.com/atlas
Create a free account
Create a new cluster (free tier)
Click Connect → Drivers
Copy the connection string
Replace <username> and <password> with your credentials

eg : MONGO_URI=mongodb+srv://<username>:<password>@cluster0.advyynx.mongodb.net/finance-db?retryWrites=true&w=majority


Sample Register Request

POST /api/auth/register

{
  "name": "Test User",
  "email": "test@gmail.com",
  "password": "123456",
  "role": "analyst"
}
