'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Options, {
        targetKey: 'optionId',
        foreignKey: 'optionId'
      });

      this.hasMany(models.OrderItems, {
        sourceKey: 'itemId',
        foreignKey: 'itemId'
      });

      this.hasOne(models.ItemOrderCustomers, {
        foreignKey: 'itemId'
      });
    }
  }
  Items.init({
    itemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    optionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    type: {
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
    modelName: 'Items',
  });
  return Items;
};