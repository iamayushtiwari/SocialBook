const express = require('express')
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash')
const customMware = require('./config/middleware')

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

//setup static folder path
app.use(express.static('./assets'))

//make the upload path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayout)

// express ulr encoded
app.use(express.urlencoded())

// express cookie parser
app.use(cookieParser())

// add dynamic style and script true 
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//Set up the View engine
app.set('view engine', 'ejs')
app.set('views', './view')

app.use(session({
    name: "socialbook",
    secret: "H@MbQeThWm",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60 * 1000 * 100
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || "connect-mongodb setup ok...!")
        }
    )
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(customMware.setFlash)

//use Express Routers
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) { console.log(`Error: ${err}`); }
    console.log(`Server is running on port: ${port}`)
})
