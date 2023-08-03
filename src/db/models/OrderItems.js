import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'

import { ItemState } from './Enum.js'
console.log("ItemState:", ItemState)

  class OrderItems extends Model {}
  
  OrderItems.init({
    orderItemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    itemId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 0
      },
    state: {
        allowNull: false,
        type: DataTypes.ENUM(Object.values(ItemState))
        // type: DataTypes.ENUM([ItemState.ORDERED, ItemState.PENDING, ItemState.COMPLETED, ItemState.CANCELED]),
        // values: [0, 1, 2, 3]
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
    modelName: 'OrderItems',
  });

  export default OrderItems;
