'use strict';
module.exports = (sequelize, DataTypes) => {
  const operations = sequelize.define('operations', {
    carteira: Sequelize.STRING,
    ativo: Sequelize.STRING,
    data: Sequelize.DATE,
    op: Sequelize.STRING,
    quantidade: Sequelize.FLOAT,
    preco: Sequelize.FLOAT,
    taxas: Sequelize.FLOAT,
    corretora: Sequelize.STRING,
    dd: Sequelize.FLOAT,
  }, {});
  operations.associate = function(models) {
    // associations can be defined here
  };
  return operations;
};