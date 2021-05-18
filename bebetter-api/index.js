const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const app = express();
const authJwt = require('./middlewares/authJwt')

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost/bebetter',
    {
        useNewUrlParser: true
    },
    { useFindAndModify: false },
    { useCreateIndex: true }
);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(session({ 
    secret: 'Shh, its a secret!', 
    saveUninitialized: false,
    resave: true,
    cookie: { 
      httpOnly: true, 
      maxAge: 60000 
    }
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', routes());
app.use(authJwt.verifyToken);
app.listen(5000, function(){
    console.log('servidor express en ejecución')
})

   

