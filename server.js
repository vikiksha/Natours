const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   console.log('UnCaught Exception shuting down....');
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<db_username>',
  process.env.DATABASE_USERNAME
).replace('<db_password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then((con) => {
  console.log('connected to the database');
});
const app = require('./app');

// console.log(process.env.NODE_ENV);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening to the port on ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection shuting down....');
  server.close(() => {
    process.exit(1);
  });
});
