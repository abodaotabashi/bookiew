const {
  createPool
} = require('mysql');

const pool  = createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'bookiew'
});

pool.query('select * from admins', (err, result, fields) => {
  if(err) {
    return console.log(err);
  } 
  return console.log(result);
})

/*
pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection
    connection.query('SELECT * FROM admins', function (error, results, fields) {
    // When done with the connection, release it.
    connection.release();
    // Handle error after the release.
    if (error) throw error;
    // Don't use the connection here, it has been returned to the pool.
    });
    console.log('database connection is working!');
});*/

