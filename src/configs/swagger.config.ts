import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Clinic Management API",
        version: "1.0.0",
        description: `
      Role Access:
      Admin (admin): Full access (CRUD for all entities).
      User (user):
      Register/Login/Change Password
      Data Search (GET + Filtering)
      Data Storage by ID
    `,
    },
    servers: [{ url: "http://localhost:8001", description: "Локальний сервер" }],
    security: [{ bearerAuth: [] }],

    tags: [
        { name: "Auth", description: "Registration, login, password change" },
        { name: "User", description: "User Management (Admin Only)" },
        { name: "Clinic", description: "Clinics" },
        { name: "Doctor", description: "Doctors" },
        { name: "Service", description: "medical services" }
    ],

    paths: {
        // ==================== Auth ====================
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "register new user",
                security: [], // Не вимагає токена
                requestBody: {
                    content: {
                        "application/x-www-form-urlencoded": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string", example: "Ivan" },
                                    surname: { type: "string", example: "Popov" },
                                    email: { type: "string", format: "email", example: "user@example.com" },
                                    password: { type: "string", format: "password", example: "Password123!" }
                                },
                                required: ["name", "surname", "email", "password"]
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "The user is registered" },
                    400: { description: "Incorrect data" }
                }
            }
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login to the system",
                security: [],
                requestBody: {
                    content: {
                        "application/x-www-form-urlencoded": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", example: "admin@example.com" },
                                    password: { type: "string", example: "AdminPassword123!" }
                                },
                                required: ["email", "password"]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Successful login",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: { type: "string" },
                                        user: {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                role: { type: "string", enum: ["user", "admin"] }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: { description: "Incorrect credentials" }
                }
            }
        },
        "/auth/reset-password/{id}": {
            post: {
                tags: ["Auth"],
                summary: "Change password (for your own account or admin)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", example: "507f1f77bcf86cd799439011" }
                    }
                ],
                requestBody: {
                    content: {
                        "application/x-www-form-urlencoded": {
                            schema: {
                                type: "object",
                                properties: {
                                    newPassword: { type: "string", format: "password", example: "NewPassword123!" }
                                },
                                required: ["newPassword"]
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "The password has been changed" },
                    403: { description: "No rights to change password" }
                }
            }
        },

        // ==================== User ====================
        "/users": {
            get: {
                tags: ["User"],
                summary: "Get all users (Admin only)",
                responses: {
                    200: {
                        description: "Список користувачів",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            surname: { type: "string" },
                                            email: { type: "string" },
                                            role: { type: "string", enum: ["user", "admin"] }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            }
        },
        "/users/{id}": {
            get: {
                tags: ["User"],
                summary: "Get user by ID (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", example: "507f1f77bcf86cd799439011" }
                    }
                ],
                responses: {
                    200: {
                        description: "User data",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        email: { type: "string" },
                                        role: { type: "string", enum: ["user", "admin"] }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" },
                    404: { description: "User not found" }
                }
            },
            put: {
                tags: ["User"],
                summary: "Update user by ID (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    email: { type: "string" },
                                    role: { type: "string", enum: ["user", "admin"] }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "The user is updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        email: { type: "string" },
                                        role: { type: "string", enum: ["user", "admin"] }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            },
            delete: {
                tags: ["User"],
                summary: "Delete user by ID (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    204: { description: "User deleted" },
                    403: { description: "Access is denied" }
                }
            }
        },

        // ==================== Clinic ====================
        "/clinics": {
            get: {
                tags: ["Clinic"],
                summary: "Get clinics (for user - only with filters)",
                parameters: [
                    {
                        name: "search",
                        in: "query",
                        description: "Search by name (e.g. `?search=Kyiv`)",
                        schema: { type: "string" }
                    },
                    {
                        name: "order",
                        in: "query",
                        description: "Sort (`name`, `-name`). The `-` sign means DESC.",
                        schema: {
                            type: "string",
                            enum: ["name", "-name"],
                            example: "-name"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "List of clinics",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            doctors: {
                                                type: "array",
                                                items: { type: "string" }
                                            },
                                            services: {
                                                type: "array",
                                                items: { type: "string" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: {
                        description: "User must use filtering (`?search=...`)"
                    }
                }
            },
            post: {
                tags: ["Clinic"],
                summary: "Create a clinic (Admin only)",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: { type: "string" },
                                    doctors: {
                                        type: "array",
                                        items: { type: "string" }
                                    },
                                    services: {
                                        type: "array",
                                        items: { type: "string" }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "The clinic has been created",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        doctors: {
                                            type: "array",
                                            items: { type: "string" }
                                        },
                                        services: {
                                            type: "array",
                                            items: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            }
        },
        "/clinics/{id}": {
            get: {
                tags: ["Clinic"],
                summary: "Get clinic by ID (available for user)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", example: "507f1f77bcf86cd799439012" }
                    }
                ],
                responses: {
                    200: {
                        description: "Clinic data",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        doctors: {
                                            type: "array",
                                            items: { type: "string" }
                                        },
                                        services: {
                                            type: "array",
                                            items: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: { description: "Clinic not found" }
                }
            },
            put: {
                tags: ["Clinic"],
                summary: "Update clinic (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: { type: "string" },
                                    doctors: {
                                        type: "array",
                                        items: { type: "string" }
                                    },
                                    services: {
                                        type: "array",
                                        items: { type: "string" }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "The clinic has been updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        doctors: {
                                            type: "array",
                                            items: { type: "string" }
                                        },
                                        services: {
                                            type: "array",
                                            items: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            },
            delete: {
                tags: ["Clinic"],
                summary: "Delete clinic (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    204: { description: "The clinic has been deleted" },
                    403: { description: "Access is denied" }
                }
            }
        },

        // ==================== Doctor ====================
        "/doctors": {
            get: {
                tags: ["Doctor"],
                summary: "Get doctors (for user - only with filters)",
                parameters: [
                    {
                        name: "search",
                        in: "query",
                        description: "Search by name, phone, email, surname (for example, `?search=David`)",
                        schema: { type: "string" }
                    },
                    {
                        name: "order",
                        in: "query",
                        description: "Sort (`name`, `-surname`). The `-` sign means DESC.",
                        schema: {
                            type: "string",
                            enum: ["name", "-name", "surname", "-surname"],
                            example: "-surname"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "List of doctors",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            surname: { type: "string" },
                                            email: { type: "string" },
                                            phone: { type: "string" },
                                            clinics: {
                                                type: "array",
                                                items: { type: "string" }
                                            },
                                            services: {
                                                type: "array",
                                                items: { type: "string" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: {
                        description: "User must use filtering (`?search=...`)"
                    }
                }
            },
            post: {
                tags: ["Doctor"],
                summary: "Create a doctor (Admin only)",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "surname"],
                                properties: {
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    email: { type: "string" },
                                    phone: { type: "string" },
                                    clinics: {
                                        type: "array",
                                        items: { type: "string" }
                                    },
                                    services: {
                                        type: "array",
                                        items: { type: "string" }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "The doctor is created",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        clinics: {
                                            type: "array",
                                            items: { type: "string" }
                                        },
                                        services: {
                                            type: "array",
                                            items: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            }
        },
        "/doctors/{id}": {
            get: {
                tags: ["Doctor"],
                summary: "Get a doctor by ID (available for user)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", example: "507f1f77bcf86cd799439013" }
                    }
                ],
                responses: {
                    200: {
                        description: "Doctor's data",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        clinics: {
                                            type: "array",
                                            items: { type: "string" }
                                        },
                                        services: {
                                            type: "array",
                                            items: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: { description: "The doctor was not found" }
                }
            },
            put: {
                tags: ["Doctor"],
                summary: "Update doctor (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "surname"],
                                properties: {
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    email: { type: "string" },
                                    phone: { type: "string" },
                                    clinics: {
                                        type: "array",
                                        items: { type: "string" }
                                    },
                                    services: {
                                        type: "array",
                                        items: { type: "string" }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "The doctor is updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        clinics: {
                                            type: "array",
                                            items: { type: "string" }
                                        },
                                        services: {
                                            type: "array",
                                            items: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            },
            delete: {
                tags: ["Doctor"],
                summary: "Delete doctor (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    204: { description: "The doctor has been removed" },
                    403: { description: "Access is denied" }
                }
            }
        },

        // ==================== Service ====================
        "/services": {
            get: {
                tags: ["Service"],
                summary: "Get services (for user - only with filters)",
                parameters: [
                    {
                        name: "search",
                        in: "query",
                        description: "Search by name (e.g. `?search=Vertebrology`)",
                        schema: { type: "string" }
                    },
                    {
                        name: "order",
                        in: "query",
                        description: "Sort (`name`, `-name`). The `-` sign means DESC.",
                        schema: {
                            type: "string",
                            enum: ["name", "-name"],
                            example: "-name"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "List of services",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            description: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: {
                        description: "User must use filtering (`?search=...`)"
                    }
                }
            },
            post: {
                tags: ["Service"],
                summary: "Create a service (Admin only)",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: { type: "string" }

                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "The service has been created",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        description: { type: "string" }
                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            }
        },
        "/services/{id}": {
            get: {
                tags: ["Service"],
                summary: "Get service by ID (available for user)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", example: "507f1f77bcf86cd799439014" }
                    }
                ],
                responses: {
                    200: {
                        description: "data services",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" }

                                    }
                                }
                            }
                        }
                    },
                    404: { description: "Service not found" }
                }
            },
            put: {
                tags: ["Service"],
                summary: "Update service (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: { type: "string" }

                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Service updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" }

                                    }
                                }
                            }
                        }
                    },
                    403: { description: "Access is denied" }
                }
            },
            delete: {
                tags: ["Service"],
                summary: "Delete service (Admin only)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    204: { description: "Service deleted" },
                    403: { description: "Access is denied" }
                }
            }
        }
    },

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};

export { swaggerDocument, swaggerUI };