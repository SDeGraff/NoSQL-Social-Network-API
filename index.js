
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const mongoose = require('mongoose');
mongoose.set('debug', true);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
