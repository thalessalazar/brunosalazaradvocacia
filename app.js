const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');
const portServer = process.env.PORT || 3333;
const MONGO_URI = require('./src/util/mongo_URI');
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);

const cookieParser = require('cookie-parser');
const csurfProtection = require('csurf')({
    cookie: true,
});

const storeSession = new mongoDBSession({
    uri: MONGO_URI,
    collection: 'sessions',
})

const setLocals = require('./src/middlewares/set-locals');

require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: 'Thales Salazar - Web Developer - HEAD Dev at Hub4Skills',
    resave: true,
    saveUninitialized: true,
    cookie: {
        // maxAge: 60 * 60 * 24 * 30 * 1000  
        maxAge: 3600 * 1000 //1 hora em milisegundos
    }
}));

// app.use(cookieParser());
// app.use(csurfProtection);

app.use(express.static(path.join(__dirname, 'src/public')));

const router = require('./src/routes/router');
// const authRouter = require('./src/routes/authRouter');
// const errorRouter = require('./src/controllers/error/server'); 

app.use(router);
// app.use(authRouter);
// app.use(errorRouter.get404);
// app.use(errorRouter.get500);

console.log(MONGO_URI);

const connection = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((result) => { })
    .then(resul => {
        app.listen(portServer, (err) => {
            if (err) {
                console.log('Houve um erro ao iniciar o servidor');
                console.log(err);
            } else {
                console.log('Servidor iniciado com sucesso na porta: ' + portServer);
            }
        });
    })
    .catch(err => console.log(err));

module.exports = connection;