'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Batch.hasMany(models.BatchSample, {
      //   foreignKey: 'batchId',
      //   as: 'batchSamples',
      //   onDelete: 'CASCADE',
      // })
      Batch.belongsToMany(models.Sample, {
        through: models.BatchSample,
        as: 'samples'
      })
      Batch.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        onDelete: 'CASCADE',
      });
    }
  }

  Batch.init({
    productId: DataTypes.INTEGER,
    batchNumber: DataTypes.BIGINT,
    productionDate: DataTypes.DATE,
    state: DataTypes.STRING,
    shatterLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Batch',
  });
  return Batch;
};
