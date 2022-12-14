'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Batch, {
        foreignKey: 'productId',
        as: 'batches',
        onDelete: 'CASCADE',
      });
    }
  }
  Product.init({
    type: DataTypes.STRING,
    brand: DataTypes.STRING,
    SKU: DataTypes.BIGINT,
    weight: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
