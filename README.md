# Clinic Management API

## Project description

It is a REST API for managing clinics, doctors, and services.  
Users can search for doctors, services, and clinics by parameters, and administrators have advanced access to manage data.

## Technologies

- Node.js (current version)
- Express.js (current)
- MongoDB (NoSQL database)
- Mongoose (ODM for MongoDB)
- JSON Web Tokens (JWT) for authorization
- Joi for input validation
- Swagger for API documentation

## Functionality

- Clinic, doctor and service management (CRUD) - for administrators only
- Search for doctors and clinics by parameters (name, services, doctor)
- User roles: admin, user
- Authorization with JWT (access and refresh tokens)
- Validation of requests via Joi
- API documentation with Swagger
- Users have limited access (search for doctors/clinics by parameters, without viewing the entire list)
- Administrators have full access and can filter and sort

## Starting a project

1.Clone the repository
2.Install dependencies(npm install)
3.To automatically format all code in a project according to Prettier rules, do:(npx prettier --write .)
4.Create an .env file in the project root
5.Start the project (npm start)

## API Structure

🔐 Auth
POST /auth/register — user registration

POST /auth/login — user login

POST /auth/reset-password/:id — password reset (authorized)

🏨 Clinics
GET /clinics — search for user, full list for admin

GET /clinics/:id — view clinic

POST /clinics — create clinic (admin)

PUT /clinics/:id — update clinic (admin)

DELETE /clinics/:id — delete clinic (admin)

👨‍⚕️ Doctors
GET /doctors — search for user, full list for admin

GET /doctors/:id — view doctor

POST /doctors — create doctor (admin)

PUT /doctors/:id — update doctor (admin)

DELETE /doctors/:id — delete doctor (admin)

💉 Services
GET /services — search for user, full list for admin

GET /services/:id — view service

POST /services — create service (admin)

PUT /services/:id — update service (admin)

DELETE /services/:id — delete service (admin)

👥 Users (admin only)
GET /users — list of users

GET /users/:id — single user

PUT /users/:id — update user

DELETE /users/:id — delete user

## Postman

The collection is located in the Clinic Api.postman_collection.json file, it contains all the necessary requests for testing the API.

## Swagger

API documentation is available at:
http://localhost:yourport/docs (And change the port in the swagger.config.ts file to your own)
