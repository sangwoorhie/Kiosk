import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'

  class Options extends Model {}
  
  Options.init({
    optionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    extraPrice: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    shotPrice: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    hot: {
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
    modelName: 'Options',
  });
  export default Options;
