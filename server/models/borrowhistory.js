'use strict';
export default (sequelize, DataTypes)=> {
  const Borrowhistory = sequelize.define('Borrowhistory', {
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
      associate: (models)=> {
        // associations can be defined here
      }
    }
  });
  return Borrowhistory;
};