import swaggerJsdoc from 'swagger-jsdoc';
import { config } from 'dotenv';

// Initialize dotenv
config();

// deine host url
const host = process.env.HOST_NAME || 'localhost:3000';

// Swagger Definitions
const swaggerDefinition = {
  info: {
    title: 'Empathy-Builder',
    version: '1.0.0',
    description: 'Empathy-Builder is an empathy and awareness-building calculator to help those not experiencing violence understand how much it would cost for them to leave their lives'
  },
  host,
  basePath: '/api/v1'
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./swagger.yaml']
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
