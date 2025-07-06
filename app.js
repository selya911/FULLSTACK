const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const DATA_FILE = path.join(__dirname, 'data.json');

app.get('/', (req, res) => res.redirect('/form1'));

app.get('/form1', (req, res) => res.render('form1'));
app.get('/form2', (req, res) => res.render('form2'));
app.get('/form3', (req, res) => res.render('form3'));

app.post('/submit', (req, res) => {
  const formData = req.body;
  fs.writeFileSync(DATA_FILE, JSON.stringify(formData, null, 2));
  res.redirect('/result');
});

app.get('/result', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.render('result', { data });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
