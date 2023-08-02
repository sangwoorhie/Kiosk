import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'

export const orderState = {
  "ORDERED": 0,
  "PENDING": 1,
  "COMPLETED": 2,
  "CANCELED": 3,
};

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
        type: DataTypes.ENUM,
        values: ['ORDERED', 'PENDING', 'COMPLETED', 'CANCELED']
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
