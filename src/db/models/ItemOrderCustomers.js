import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'


  class ItemOrderCustomers extends Model {}
  
  ItemOrderCustomers.init({
    itemOrderCustomerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    itemId: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    orderCustomerId: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    option: {
        allowNull: false,
        type: DataTypes.JSON,
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'ItemOrderCustomers',
  });

  export default ItemOrderCustomers;
