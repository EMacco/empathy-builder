import Response from '@helpers/Response';
import { isNumber } from 'util';
import models from '@models';

const { MonthlyExpense } = models;

/**
 * @exports ExpensesController
 * @class ExpensesController
 * @description Handles Social Users
 * */
class ExpensesController {
  /**
   * Create a monthly budget
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object
   * @static
   */
  static async createMonthlyBudget(req, res, next) {
    try {
      if (!req.body.expenses) { return Response.error(res, 400, 'Please enter monthly expenses'); }

      const { id: userId } = req.decoded;
      let expenses = JSON.parse(req.body.expenses);
      expenses = expenses.map((expense) => {
        const newExpense = { ...expense, userId };
        if (!isNumber(newExpense.cost)) { throw new Error(`Cost for ${newExpense.item} should be a number`); }
        return newExpense;
      });

      await MonthlyExpense.destroy({ where: { userId } });
      await MonthlyExpense.bulkCreate(expenses);
      const monthlyExpenses = await MonthlyExpense.findAll({
        where: { userId },
        attributes: ['item', 'cost']
      });

      const totalCost = monthlyExpenses.reduce(
        (partialSum, a) => partialSum + Number(a.get().cost),
        0
      );

      return Response.success(
        res,
        201,
        { monthlyExpenses, totalCost },
        'Monthly budget successfully saved'
      );
    } catch (err) {
      if (err.message.includes('JSON')) { return Response.error(res, 400, 'Please enter valid data!'); }
      next(err);
    }
  }

  /**
   * Fetch a monthly budget
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object
   * @static
   */
  static async fetchMonthlyBudget(req, res, next) {
    try {
      const monthlyExpenses = await MonthlyExpense.findAll({
        where: { userId: req.decoded.id },
        attributes: ['item', 'cost']
      });

      const totalCost = monthlyExpenses.reduce(
        (partialSum, a) => partialSum + Number(a.get().cost),
        0
      );

      return Response.success(
        res,
        201,
        { monthlyExpenses, totalCost },
        'Monthly budget successfully retrieved'
      );
    } catch (err) {
      next(err);
    }
  }
}

export default ExpensesController;
