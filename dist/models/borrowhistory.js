'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Borrowhistory = sequelize.define('Borrowhistory', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    returned: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Borrowhistory;
};