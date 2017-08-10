'use strict';
export default  {
  up: (queryInterface, Sequelize)=> {
    return queryInterface.createTable('Borrowhistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bookid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      returned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize)=> {
    return queryInterface.dropTable('Borrowhistories');
  }
};