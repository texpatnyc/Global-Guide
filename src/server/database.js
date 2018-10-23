'use strict';

const Sequelize = require('sequelize');

// const sequelize = new Sequelize('global_guide', 'texpatnyc', 'nomames', {
//   host: 'localhost:5432',
//   dialect: 'postgres'
// });

const sequelize = new Sequelize('postgres://texpatnyc:nomames@localhost:5432/global_guide');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
