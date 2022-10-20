'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BatchSample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  BatchSample.init({
    BatchId: DataTypes.INTEGER,
    batchId: DataTypes.INTEGER,
    SampleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BatchSample',
  });
  return BatchSample;
};
