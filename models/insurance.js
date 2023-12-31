'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insurance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Insurance.belongsTo(models.Insurance_type, {
        foreignKey: "idInsurance_type",
      })
      Insurance.belongsTo(models.Staff, {
        foreignKey: "idStaff",
      })
      Insurance.hasMany(models.Detail_contract, {
        foreignKey: "idInsurance",
      });
      Insurance.hasMany(models.Sub_insurance, {
        foreignKey: "idMainInsurance",
        as: 'mainInsurance'
      });
      Insurance.hasMany(models.Sub_insurance, {
        foreignKey: "idSubInsurance",
        as: 'subInsurance'
      });
      Insurance.hasMany(models.Catalog_insurance, {
        foreignKey: "idInsurance",
      });
      Insurance.hasMany(models.Insurance, {
        foreignKey: "idMainInsurance",
        as: 'main'
      });
      Insurance.belongsTo(models.Insurance, {
        foreignKey: "idMainInsurance",
        targetKey: "idInsurance",
        as: 'sub'
      });
    }
  }
  Insurance.init({
    idInsurance: {
      allowNull: false,

      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    info: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isMain: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    premium: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    premiumPaymentTerm: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
 
    insuranceAmount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    contractTerm: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isDel: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    idInsurance_type: {
      allowNull: true,


      references: { model: "Insurance_type", key: "idInsurance_type" },
      type: DataTypes.INTEGER
    },
   
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    idMainInsurance: {
      allowNull: true,


      references: { model: "Insurance", key: "idInsurance" },
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Insurance',
    timestamps: false,
  });
  return Insurance;
};