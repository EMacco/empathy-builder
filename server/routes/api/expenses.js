import express from 'express';
import trim from '@middlewares/trim';
import Token from '@helpers/Token';
import ExpensesController from '@controllers/expenses';


const budgetRouter = express.Router();

budgetRouter.post('/monthly', Token.authorize, trim, ExpensesController.createMonthlyBudget);
budgetRouter.get('/monthly', Token.authorize, ExpensesController.fetchMonthlyBudget);
budgetRouter.post('/relocation', Token.authorize, trim, ExpensesController.createRelocationBudget);
budgetRouter.get('/relocation', Token.authorize, ExpensesController.fetchRelocationBudget);
budgetRouter.get('/budget', Token.authorize, ExpensesController.fetchBudget);

export default budgetRouter;
