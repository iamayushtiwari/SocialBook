// getting-started.js
const mongoose = require('mongoose');
const db = mongoose.connection

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/socialbook_development');
  console.log("database loaded")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
db.on('error', console.error.bind(console, "Error connecting to db"));

db.once('open', function(){
    console.log("connected to DB"); 
})
module.exports=db;