import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'

  class Managers extends Model {}
  
  Managers.init({
    ManagerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    email: {
      allowNull: false,
      type: DataTypes.BIGINT,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.BIGINT,
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
    modelName: 'Managers',
  });

  export default Managers;
