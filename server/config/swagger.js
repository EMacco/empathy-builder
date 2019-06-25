import swaggerJsdoc from 'swagger-jsdoc';
import { config } from 'dotenv';

// Initialize dotenv
config();

// deine host url
const host = process.env.HOST_NAME || 'localhost:3000';

// Swagger Definitions
const swaggerDefinition = {
  info: {
    title: 'MentorMe',
    version: '1.0.0',
    description: 'MentorMe lets you lend your business skills to an entrepreneurs across the globe.',
  },
  host,
  basePath: '/api/v1'
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['/swagger.yaml']
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
