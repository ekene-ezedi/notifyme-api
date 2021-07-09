//define packages/modules
const config = require('config');
const mongoose = require('mongoose');

//database connection string and error handling
module.exports = function(){
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    poolSize: 10,
    socketTimeoutMS: 45000,
    family: 4
  };

  const db = config.get('db');
  let DB = mongoose.connect(db, options);
      DB.then(()=>console.log(`Database connection @${db}`))
        .catch((error)=>console.log(error));
}