const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool;
const config   = require('../modules/config');
let pool = new Pool(config);

router.get('/', function(req, res, next) {
    createForm(res);
});
function createForm(res){
  let response = pool.query(`
    select * from ticTacToe ORDER BY id;
  `, (err, result) => {
      processArray(result,res)
  });

function processArray(array, res) {
  let iter = 0;
  let r = 0;
  let c = 0;
  let form = '<form action="/game" method="POST" id="field">';
  for (const row of Object.keys(array)) {
    r++;
    c = 0;
    if(r<4){
      for (const col of Object.keys(array.rows)) {
        c++;
        iter++;
        asfor(Object.entries(array.rows[r-1])[c-1],iter);
      }
    }

    function asfor(c,iter){
      const cell = c[1];
      if(cell == true){
          form += `<input type="text" value="+" disabled>`;
        }else if(cell == false){
          form += `<input type="text" value="o" disabled>`;
        }else{
          form += `<input type="text" name="${iter}">`;
        }
    }
  }
  form += '<input type="submit" value="отправить ход"></form>'
  res.render('game', { form: form });

}

}
module.exports = router;
