import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express TS API",
      version: "1.0.0",
      description: "API documentation with Swagger & TypeScript",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`, // adjust as needed
      },
    ],
  },
  // Array of files where routes are defined and documented
  apis: ["./src/routes/*.ts", "./src/models/*.ts", "./src/swagger-docs/*.ts"], // adjust path as needed
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
