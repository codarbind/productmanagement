let mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) .then(() => {
    console.log("connected to DB");
    
  })
  .catch(err => {
    console.error("error while connecting to DB", err);
    process.exit();
  });

  module.exports = mongoose