const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://texpatnyc:nomames@localhost:5432/global_guide');


// Models

const Locale = sequelize.define('locale', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, allowNull: false },
  cityName: { type: Sequelize.STRING, allowNull: false },
  summary: { type: Sequelize.TEXT, allowNull: false }
})

const Restaurant = sequelize.define('restaurant', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, allowNull: false },
  cityId: { type: Sequelize.UUID, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  address: { type: Sequelize.STRING },
  url: { type: Sequelize.STRING, },
  description: { type: Sequelize.TEXT, allowNull: false }
})

const Bar = sequelize.define('bar', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, allowNull: false },
  cityId: { type: Sequelize.UUID, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  address: { type: Sequelize.STRING },
  url: { type: Sequelize.STRING, },
  description: { type: Sequelize.TEXT, allowNull: false }
})

const Sight = sequelize.define('sight', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, allowNull: false },
  cityId: { type: Sequelize.UUID, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  address: { type: Sequelize.STRING },
  url: { type: Sequelize.STRING, },
  description: { type: Sequelize.TEXT, allowNull: false }
})

// Associations 


// Open DB

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   })

//   Locale.create({
//     cityName: 'Austin',
//     summary: "The city of my childhood!"
//   });

  module.exports = { Locale, Restaurant, Bar, Sight };