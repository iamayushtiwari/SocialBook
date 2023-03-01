const express = require('express')
const port = 8000;
const app = express();

//use Express Routers
app.use('/',require('./routes'));

//Set up the View engine
app.set('view engine','ejs')
app.set('views','./view')

app.listen(port,function(err){
    if(err){console.log(`Error: ${err}`);}
    console.log(`Server is running on port: ${port}`)
})