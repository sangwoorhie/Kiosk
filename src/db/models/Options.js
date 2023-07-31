import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'


  class Options extends Model {}
  
  Options.init({
    optionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    extraPrice: {
      allowNull: false,
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    shotPrice: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    hot: { //or Ice
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
