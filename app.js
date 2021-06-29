if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const indexRoutes = require('./routes/index');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to mongoose'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use('/', indexRoutes);

app.listen(process.env.PORT || 3000, function () {
  console.log('Website has started');
});
