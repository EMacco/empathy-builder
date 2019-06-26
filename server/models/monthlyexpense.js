

module.exports = (sequelize, DataTypes) => {
  const MonthlyExpense = sequelize.define('MonthlyExpense', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {});
  return MonthlyExpense;
};
