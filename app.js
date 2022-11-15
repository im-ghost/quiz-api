const express = require("express")

const apiRouter = require('./routes/index');

const app = express();
const {
  connectDB
} = require("./config/db")
connectDB()
app.use('/api', apiRouter);
// catch 404 and forward to error handler

module.exports = app;
