const Pool = require('pg').Pool;
const config   = require('../modules/config');
 async function createTable(){
   let pool = new Pool(config);
  await pool.query(`CREATE TABLE ticTacToe (
    a BOOLEAN NULL ,
    b BOOLEAN NULL ,
    c BOOLEAN NULL ,
    id integer NOT NULL
  )`,()=>{
    pool.query(`
      INSERT INTO ticTacToe VALUES (DEFAULT,DEFAULT,DEFAULT,1),(DEFAULT,DEFAULT,DEFAULT,2),(DEFAULT,DEFAULT,DEFAULT,3);
    `,()=>{
      pool.end();
      triggerFunction();
    });
  });
}
 async function createTable2(){
   let pool = new Pool(config);
  await pool.query(`CREATE TABLE ticTacToeForTrigger (
    a BOOLEAN NULL ,
    b BOOLEAN NULL ,
    c BOOLEAN NULL ,
    id integer NOT NULL
  )`,()=>{
    pool.query(`
      INSERT INTO ticTacToeForTrigger VALUES (DEFAULT,DEFAULT,DEFAULT,1),(DEFAULT,DEFAULT,DEFAULT,2),(DEFAULT,DEFAULT,DEFAULT,3);
    `,()=>{
      pool.end();
    });
  });
}
async function triggerFunction(){
  let pool = new Pool(config);
  var response = await pool.query(`

    CREATE OR REPLACE FUNCTION updateCell() RETURNS TRIGGER AS
    $BODY$
    BEGIN
      RAISE NOTICE 'START TRIGGER';
      If ((SELECT b FROM ticTacToe WHERE id = 2) IS NULL)then
        UPDATE ticTacToe SET b = false WHERE id = 2 AND b IS NULL;
      ELSEIF((SELECT a FROM ticTacToe WHERE id = 1) IS NULL) then
        UPDATE ticTacToe SET a = false WHERE id = 1 AND a IS NULL;
      ELSEIF((SELECT a FROM ticTacToe WHERE id = 3) IS NULL) then
        UPDATE ticTacToe SET a = false WHERE id = 3 AND a IS NULL;
      ELSEIF((SELECT c FROM ticTacToe WHERE id = 3) IS NULL) then
        UPDATE ticTacToe SET c = false WHERE id = 3 AND c IS NULL;
      ELSEIF((SELECT a FROM ticTacToe WHERE id = 2) IS NULL) then
        UPDATE ticTacToe SET a = false WHERE id = 2 AND a IS NULL;
      ELSEIF((SELECT c FROM ticTacToe WHERE id = 2) IS NULL) then
        UPDATE ticTacToe SET c = false WHERE id = 2 AND c IS NULL;
      ELSEIF((SELECT b FROM ticTacToe WHERE id = 1) IS NULL) then
        UPDATE ticTacToe SET b = false WHERE id = 1 AND b IS NULL;
      ELSEIF((SELECT c FROM ticTacToe WHERE id = 1) IS NULL) then
        UPDATE ticTacToe SET c = false WHERE id = 1 AND c IS NULL;
      ELSEIF((SELECT b FROM ticTacToe WHERE id = 3) IS NULL) then
        UPDATE ticTacToe SET b = false WHERE id = 3 AND b IS NULL;
      END IF;
      RETURN NULL;

    END;
    $BODY$
    LANGUAGE plpgsql;
`,()=>{
  pool.end();
  addTriger();
});

}
async function addTriger(){
  let pool = new Pool(config);
  var response = await pool.query(`
    CREATE TRIGGER updateCell
    AFTER UPDATE ON ticTacToeForTrigger FOR EACH ROW EXECUTE
    PROCEDURE updateCell ();
`,()=>{
  pool.end();
});
}
createTable();
createTable2();




// DECLARE
// key integer;
// curs4 CURSOR FOR SELECT * FROM tenk1 WHERE id = key;
// crs_my CURSOR FOR select id_per, rashod, summa from test.test where
// id_user = _id_user order by id_per;
// BEGIN
// key := 42;
// OPEN curs4;
//
// исп FETCH
