import express from 'express';
import trim from '@middlewares/trim';
import Token from '@helpers/Token';
import ExpensesController from '@controllers/expenses';


const budgetRouter = express.Router();

budgetRouter.post('/monthly', Token.authorize, trim, ExpensesController.createMonthlyBudget);

export default budgetRouter;
