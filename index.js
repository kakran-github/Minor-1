const mongoose = require('mongoose');
const app = require('./app');
const db = {url:"mongodb+srv://minor1:iRdJFJ343TLYR6kD@cluster0.xs08vgg.mongodb.net/?retryWrites=true&w=majority", options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },}

let server;
mongoose.connect(db.url, db.options).then(() => {
  console.log('Connected to MongoDB');
  server = app.listen(8000, () => {
    console.log(`Listening to port ${8000}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});