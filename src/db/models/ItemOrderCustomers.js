import { Model, DataTypes } from 'sequelize'
import sequelize from '../sequelize.js';

  class ItemOrderCustomers extends Model {}

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
  
  export default ItemOrderCustomers;
