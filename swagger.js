// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "A simple API documentation",
    },
    servers: [
      {
        url: "http://localhost:" + process.env.PORT || 8000, // Your server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, just for documentation
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routers/*.js"], // Path to the API docs (assuming authRouter and postsRouter are here)
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
