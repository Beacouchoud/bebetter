const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost/bebetter',
    {
        useNewUrlParser: true
    }
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', routes());

app.listen(5000, function(){
    console.log('servidor express en ejecución')
})



