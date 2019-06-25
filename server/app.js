import express from 'express';
import debug from 'debug';
import logger from 'morgan';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import apis from '@routes/api';
import swaggerSpec from './config/swagger';

const debugged = debug('app');
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(cors(corsOptions));

app.use('/api/v1', apis);

// swagger-ui-express for API endpoint documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  debugged(`Listening from port ${port}`);
});

export default app;
