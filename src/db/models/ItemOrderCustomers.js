'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOrderCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // ItemOrderCustomers모델 - Items모델 : N:1관계
      this.belongsTo(models.Items, {
        targetKey: 'itemId',
        foreignKey: 'itemId'
      });

      // ItemOrderCustomers모델 - OrderCustomers모델 : N:1관계
      this.belongsTo(models.OrderCustomers, {
        targetKey: 'orderCustomerId',
        foreignKey: 'orderCustomerId'
      });
    }
  }
  ItemOrderCustomers.init({
    itemOrderCustomerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    orderCustomerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ItemOrderCustomers',
  });
  return ItemOrderCustomers;
};