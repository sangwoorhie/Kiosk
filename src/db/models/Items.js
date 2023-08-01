import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'

export const ItemType = {
  COFFEE: 'coffee',
  TEA: 'tea',
  JUICE:  'juice',
  DESERT:  'desert',
  SMOOTHIE: 'smoothie'
  }

  class Items extends Model {}
  
  Items.init({
    itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
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
        values: ['coffee', 'tea', 'juice', 'desert', 'smoothie']
    },
    amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 1
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
