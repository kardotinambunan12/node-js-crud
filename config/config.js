require ('dotenv/config');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host :process.env.DB_HOST,
    user :process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
});

conn.connect(function(err){
    if (err) throw err;
    console.log("database connected ..")
})