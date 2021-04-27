const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_CNN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology : true,
      useCreateIndex : true
    });

    console.log("DB Online")
    
  } catch (error) {
    throw new Error('Erroe en la base de datos, vea logs')
  }
}


module.exports = {
  dbConnection
}