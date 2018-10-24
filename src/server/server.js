const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');

const { Locale, Restaurant, Bar, Sight } = require('./database');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://texpatnyc:nomames@localhost:5432/global_guide');


const app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/locales', (req, res) => {
  Locale.findAll({ attributes: ['cityName', 'id'] })
    .then( (data) => { res.send(data) });
})

app.post('/api/locales', (req, res) => {
  console.log(req.body);
  const { cityName, summary } = req.body;
  Locale.create({ cityName: cityName, summary: summary })
    .then( console.log('Locale Added, BIATCH!') )
    .then( res.end() )
})

app.get('/api/restaurants/:cityId', (req, res) => {
  const { cityId } = req.params;
  console.log(cityId);
  Restaurant.findAll({ attributes: ['name', 'address', 'url', 'description'], where: { cityId: cityId } })
    .then( (data) => { res.json(data) } );
})

app.post('/api/restaurants/:cityId', (req, res) => {
  const { cityId } = req.params;
  const { name, address, url, description } = req.body;
  Restaurant.create({
    cityId: cityId,
    name: name,
    address: address,
    url: url,
    description: description
  })
    .then( console.log('Restaurant added, BIATCH!!!!') )
    .then( res.end() )
})

app.put('/api/restaurants/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
			`(${req.body.id}) must match`);
		req.flash('error', message);
		return res.redirect('back');
  }

  const toUpdate = {};
	const updateableFields = ['name', 'address', 'url', 'description'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
  });
  const keys = Object.keys(toUpdate);
  console.log(toUpdate);
  console.log(keys);

  Restaurant.update(toUpdate, { where: { id: req.params.id }, fields: keys })
    .then( () => {
      console.log('successful edit');
      res.end()
    })
})

app.delete('/api/restaurants/:id', (req, res) => {
  Restaurant.destroy( { where: { id: req.params.id } })
    .then(() => {
      console.log('restaurant deleted');
      res.end();
    })
  })




app.listen(8080, () => console.log('Listening on port 8080!'));
