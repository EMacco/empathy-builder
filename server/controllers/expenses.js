import Response from '@helpers/Response';
import { isNumber } from 'util';
import models from '@models';

const { MonthlyExpense, Relocation } = models;

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
        200,
        { monthlyExpenses, totalCost },
        'Monthly budget successfully retrieved'
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a renovatio budget
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object
   * @static
   */
  static async createRelocationBudget(req, res, next) {
    try {
      if (!req.body.expenses) { return Response.error(res, 400, 'Please enter relocation expenses'); }

      const { id: userId } = req.decoded;
      let expenses = JSON.parse(req.body.expenses);
      expenses = expenses.map((expense) => {
        const newExpense = { ...expense, userId };
        if (!isNumber(newExpense.cost)) { throw new Error(`Cost of ${newExpense.item} should be a number`); }
        if (!isNumber(newExpense.quantity)) { throw new Error(`Quantity of ${newExpense.item} should be a number`); }
        if (newExpense.quantity < 1) { throw new Error(`Quantity of ${newExpense.item} should be greater than 0`); }
        newExpense.cost = Number(newExpense.cost) * Number(newExpense.quantity);
        delete newExpense.quantity;
        return newExpense;
      });

      await Relocation.destroy({ where: { userId } });
      await Relocation.bulkCreate(expenses);
      const relocationExpenses = await Relocation.findAll({
        where: { userId },
        attributes: ['item', 'cost']
      });

      const totalCost = relocationExpenses.reduce(
        (partialSum, a) => partialSum + Number(a.get().cost),
        0
      );

      return Response.success(
        res,
        201,
        { relocationExpenses, totalCost },
        'Relocation budget successfully saved'
      );
    } catch (err) {
      if (err.message.includes('JSON')) { return Response.error(res, 400, 'Please enter valid data!'); }
      next(err);
    }
  }

  /**
   * Fetch renovation budget
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object
   * @static
   */
  static async fetchRelocationBudget(req, res, next) {
    try {
      const relocationExpenses = await Relocation.findAll({
        where: { userId: req.decoded.id },
        attributes: ['item', 'cost']
      });

      const totalCost = relocationExpenses.reduce(
        (partialSum, a) => partialSum + Number(a.get().cost),
        0
      );

      return Response.success(
        res,
        200,
        { relocationExpenses, totalCost },
        'Relocation budget successfully retrieved'
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * Fetch full budget
   * @async
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object
   * @static
   */
  static async fetchBudget(req, res, next) {
    try {
      const relocationExpenses = await Relocation.findAll({
        where: { userId: req.decoded.id },
        attributes: ['item', 'cost']
      });

      const totalCost = relocationExpenses.reduce(
        (partialSum, a) => partialSum + Number(a.get().cost),
        0
      );

      const monthlyExpenses = await MonthlyExpense.findAll({
        where: { userId: req.decoded.id },
        attributes: ['item', 'cost']
      });

      const mtotalCost = monthlyExpenses.reduce(
        (partialSum, a) => partialSum + Number(a.get().cost),
        0
      );

      const combinedBudget = {
        monthly: { expenses: monthlyExpenses, totalCost: mtotalCost },
        relocation: { expenses: relocationExpenses, totalCost },
        totalBudget: (totalCost + mtotalCost)
      };

      return Response.success(
        res,
        200,
        combinedBudget,
        'Full budget successfully retrieved'
      );
    } catch (err) {
      next(err);
    }
  }
}

export default ExpensesController;
