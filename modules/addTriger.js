const pool   = require('./config');
let arr = [
  [null,null,null],
  [null,null,true],
  [null,null,null],
];

async function init(){
  var response = await pool.query(`
    CREATE OR REPLACE FUNCTION alert1() RETURNS TRIGGER AS
    $BODY$
      BEGIN
        UPDATE ticTacToe
          IF ticTacToe.a = NULL then
            SET ticTacToe.a = false
          end if
      END;
    $BODY$
    LANGUAGE plpgsql;
`);
}
init();
pool.end();
// UPDATE ticTacToe
// SET NEW.c = NULL
// WHERE a is null;
