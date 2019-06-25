module.exports = (sequelize, DataTypes) => {
  const Relocation = sequelize.define('Relocation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  return Relocation;
};
