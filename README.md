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
   2.Install dependencies
   3.Create an .env file in the project root
   4.Start the project (npm start)

## Структура API

🔐 Auth
POST /auth/register — реєстрація користувача

POST /auth/login — авторизація

POST /auth/reset-password/:id — скидання пароля (авторизований)

🏨 Clinics
GET /clinics — пошук для user, повний список для admin

GET /clinics/:id — перегляд клініки

POST /clinics — створення клініки (admin)

PUT /clinics/:id — оновлення (admin)

DELETE /clinics/:id — видалення (admin)

👨‍⚕️ Doctors
GET /doctors — пошук для user, повний список для admin

GET /doctors/:id — перегляд лікаря

POST /doctors — створення лікаря (admin)

PUT /doctors/:id — оновлення (admin)

DELETE /doctors/:id — видалення (admin)

💉 Services
GET /services — пошук для user, повний список для admin

GET /services/:id — один сервіс

POST /services — створення (admin)

PUT /services/:id — оновлення (admin)

DELETE /services/:id — видалення (admin)

👥 Users (admin only)
GET /users — список користувачів

GET /users/:id — один користувач

PUT /users/:id — оновлення користувача

DELETE /users/:id — видалення

## Postman

The collection is located in the Clinic Api.postman_collection.json file, it contains all the necessary requests for testing the API.

## Swagger

API documentation is available at:
http://localhost:8001/docs
