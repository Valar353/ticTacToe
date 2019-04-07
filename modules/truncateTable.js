const config   = require('./config');
const Pool = require('pg').Pool;
const pool = new Pool(config);
async function init(pool){
 await pool.query(`
   TRUNCATE TABLE ticTacToe;
   INSERT INTO ticTacToe VALUES (DEFAULT,DEFAULT,DEFAULT,1),(DEFAULT,DEFAULT,DEFAULT,2),(DEFAULT,DEFAULT,DEFAULT,3)
 `);
 await pool.query(`
   TRUNCATE TABLE ticTacToeForTrigger;
   INSERT INTO ticTacToeForTrigger VALUES (DEFAULT,DEFAULT,DEFAULT,1),(DEFAULT,DEFAULT,DEFAULT,2),(DEFAULT,DEFAULT,DEFAULT,3)
 `,()=>{
   pool.end();
 });
}
// init();
module.exports = init();
