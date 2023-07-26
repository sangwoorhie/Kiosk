// 'use strict';
import { Model, DataTypes } from 'sequelize'
import sequelize from '../sequelize.js';
// module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Items모델-Options모델 : N:1관계
      this.belongsTo(models.Options, {
        targetKey: 'optionId',
        foreignKey: 'optionId'
      });

      // Items모델-OrderItems모델 : 1:N관계
      this.hasMany(models.OrderItems, {
        sourceKey: 'itemId',
        foreignKey: 'itemId'
      });

      // Items모델-ItemOrderCustomers모델 : 1:1관계
      this.hasOne(models.ItemOrderCustomers, {
        sourceKey: 'itemId',
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
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['COFFEE', 'JUICE', 'FOOD']
    },
    amount: {
      allowNull: false,
      type: DataTypes.BIGINT,
      defaultValue: 0
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

export default Items;

  // return Items;
// };