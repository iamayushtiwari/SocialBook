const express = require('express')
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts')
app.use(expressLayout)

app.use(express.static('./assets'))

// add dynamic style and script true 
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

//use Express Routers
app.use('/',require('./routes'));

//Set up the View engine
app.set('view engine','ejs')
app.set('views','./view')

app.listen(port,function(err){
    if(err){console.log(`Error: ${err}`);}
    console.log(`Server is running on port: ${port}`)
})