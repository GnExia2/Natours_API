const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB connection successful!'))


//Read Json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import Data to DATABASE
const importData = async () => {
  try{
    await Tour.create(tours)
    console.log('data sucessfully loaded');
    process.exit();
  } catch(err) {
    console.log(err);
  }
};

//Delete all existing DATABASE
const deleteData = async () => {
  try{
    await Tour.deleteMany()
    console.log('data sucessfully deleted');
    process.exit();
  } catch(err) {
    console.log(err);
  }
}

if(process.argv[2] === '--import'){
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
