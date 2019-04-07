const pool   = require('./config');

async function init(){
  var response = await pool.query(`
    CREATE TRIGGER alert1
    AFTER UPDATE ON ticTacToe FOR EACH ROW EXECUTE
    PROCEDURE alert1 ();
`);
}
init();
pool.end();
