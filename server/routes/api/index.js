import express from 'express';
import userRouter from './users';
import authRouter from './auth';
import expensesRouter from './expenses';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => response.status(200).send('Welcome to the Empathy-Builder API'));

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/expenses', expensesRouter);

export default apiRouter;
