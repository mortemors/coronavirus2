'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('operations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ativo: Sequelize.STRING,
      data: Sequelize.DATE,
      op: Sequelize.STRING,
      quantidade: Sequelize.FLOAT,
      preco: Sequelize.FLOAT,
      taxas: Sequelize.FLOAT,
      corretora: Sequelize.STRING,
      dd: Sequelize.FLOAT,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('operations');
  }
};