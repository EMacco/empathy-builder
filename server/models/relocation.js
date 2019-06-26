module.exports = (sequelize, DataTypes) => {
  const Relocation = sequelize.define('Relocation', {
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
  return Relocation;
};
