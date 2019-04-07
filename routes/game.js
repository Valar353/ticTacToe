const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool;
const config = {
  host: 'localhost',
  database: 'postgres',
  user: 'postgres',
  password: 'jt3y63id',
}
let pool = new Pool(config);

router.get('/', function(req, res, next) {
    createForm(res);
});
async function createForm(res){
  let response = await pool.query(`
    select * from ticTacToe ORDER BY id;
  `, (err, result) => {
    (async function(){
      let f =  await ff(result,res)
    })();
  });

function ff(result, res){
    async function processArray(array) {
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
            await asfor(Object.entries(array.rows[r-1])[c-1],iter);
          }
        }

        async function asfor(c,iter){
          const cell = c[1];
          // console.log(cell);
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
      // await console.log('end!', form);
      await res.render('game', { form: form });

      // return form;
    }

    processArray(result,res);
}
}
module.exports = router;
