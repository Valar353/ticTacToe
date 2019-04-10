var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
const Pool = require('pg').Pool;

var app = express();
var game = require('./routes/game');
const config   = require('./modules/config');

app.use('/game', game);
app.use('/game', bodyParser.urlencoded({
    extended: true
}));

app.post('/game', function(req, res, next) {
    let n = 0;
    for (const key of Object.keys(req.body)) {
      if(req.body[key] !== null && req.body[key] !== '') {
        n = key;
        break;
      }
    }
    const arr = [[1,'a'],[1,'b'],[1,'c'],[2,'a'],[2,'b'],[2,'c'],[3,'a'],[3,'b'],[3,'c']];
    let rowCol = arr[n-1]
    let pool = new Pool(config);
    if(Object.keys(req.body)=='truncate'){
        pool.query(`
          TRUNCATE TABLE ticTacToe;
          INSERT INTO ticTacToe VALUES (DEFAULT,DEFAULT,DEFAULT,1),(DEFAULT,DEFAULT,DEFAULT,2),(DEFAULT,DEFAULT,DEFAULT,3)
        `);
        pool.query(`
          TRUNCATE TABLE ticTacToeForTrigger;
          INSERT INTO ticTacToeForTrigger VALUES (DEFAULT,DEFAULT,DEFAULT,1),(DEFAULT,DEFAULT,DEFAULT,2),(DEFAULT,DEFAULT,DEFAULT,3)
        `,()=>{
          pool.end();
          res.redirect('back');
        });
    }else{
       function init(res){
        let response = pool.query(`
          UPDATE ticTacToe
          SET ${rowCol[1]} = true
          where ${rowCol[0]} = id;
          UPDATE ticTacToeForTrigger
          SET ${rowCol[1]} = true
          where ${rowCol[0]} = id;
        `,function(){
          pool.end()
          res.redirect('back');
        });
      }
      init(res);
    }
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
