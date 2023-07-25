'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Items, {
        sourceKey: 'optionId',
        foreignKey: 'optionId'
      });
    }
  }
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
  return Options;
};