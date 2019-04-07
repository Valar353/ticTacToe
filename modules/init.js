const pool   = require('./config');

 async function createTable(){
  await pool.query(`CREATE TABLE ticTacToe (
    a BOOLEAN NULL ,
    b BOOLEAN NULL ,
    c BOOLEAN NULL ,
    id integer NOT NULL
  )`,(err, result)=>{
    if(err){
      return console.error('Error executing query', err.stack)
    }
    (async function(){
      await pool.query(`
        INSERT INTO ticTacToe VALUES (DEFAULT,DEFAULT,DEFAULT,1),(DEFAULT,DEFAULT,DEFAULT,2),(DEFAULT,DEFAULT,DEFAULT,3);
      `,()=>{
        pool.end();
      });
    })();
  });
}
createTable();
