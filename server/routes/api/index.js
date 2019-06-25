import express from 'express';
import userRouter from './users';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => response.status(200).send('Welcome to the Empathy-Builder API'));

apiRouter.use('/users', userRouter);

export default apiRouter;
