'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      dest: {
        type: Sequelize.STRING
      },
      departure: {
        type: Sequelize.TIME
      },
      arrival: {
        type: Sequelize.TIME
      },
      eta: {
        type: Sequelize.TIME
      },
      airline: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('flights');
  }
};