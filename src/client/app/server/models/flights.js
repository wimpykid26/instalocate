'use strict';
module.exports = function(sequelize, DataTypes) {
  var flights = sequelize.define('flights', {
    name: DataTypes.STRING,
    source: DataTypes.STRING,
    dest: DataTypes.STRING,
    departure: DataTypes.TIME,
    arrival: DataTypes.TIME,
    eta: DataTypes.TIME,
    airline: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return flights;
};