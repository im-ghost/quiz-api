const express = require("express")
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require("cors")
const indexRouter = require("./routes/index")
const usersRouter = require('./routes/users');
const quizRouter = require('./routes/quiz');

const app = express();
const {
  connectDB
} = require("./config/db")
connectDB()
const corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['Authorization', 'Content-Type'],
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/v1/quiz",quizRouter)
app.use("/api/v1/users",usersRouter)
app.use('/api/to',indexRouter);

app.use(function(req, res, next) {
  console.log("here")
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // send the error page
    res.status(err.status || 500);
    res.send(err);
  })
const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log("running on port:" + port)
})
module.exports = app
