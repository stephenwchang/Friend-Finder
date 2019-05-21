const htmlRoutes = require('express').Router();
const path = require('path');


htmlRoutes.get('/survey', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/survey.html'));

})

htmlRoutes.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/home.html'));

})

module.exports = htmlRoutes;
