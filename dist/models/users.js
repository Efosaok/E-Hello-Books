'use strict';

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    othername: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    borrowedbooks: {
      type: DataTypes.STRING
    },
    membershipLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Silver'
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};