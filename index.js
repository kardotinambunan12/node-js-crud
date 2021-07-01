const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const conn =  require('./config/config')


app.use(bodyParser.json());

// //membuat koneksi database

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user : 'root',
//     password:'',
//     database :'restful_db'
// });

// //koneksi ke database

// conn.connect((err) =>{
//     if(err) throw err;
//     console.log('mysql connected...');
// });

//tampilkan semua data user
app.get('/api/users', (req, res) => {
    let sql = "SELECT * FROM user;"
    let query = conn.query(sql, (err, results) =>  {
        if(err) throw  err;
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});
// menampilkan user berdasarkan id

app.get('/api/users/:id', (req, res) =>{
    let sql = "SELECT * FROM user WHERE user_id =" +req.params.id;
    let query = conn.query(sql,(err, results) =>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error":null, "response": results} ));
    });
});
//menambahkan data user baru

app.post('/api/users', (req, res) => {
    let data = {first_name: req.body.first_name, last_name: req.body.last_name, age:req.body.age, address: req.body.address};
    let sql = "INSERT INTO user SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});
// edit data user berdasarkan id user

app.put('/api/users/:id', (req, err )=> {
    let sql = "UPDATE user SET first_name = '"+req.body.first_name + "', last_name ='"+ req.body.last_name +"', age ='" + req.body.age +"', address ='"+ req.body.address +"' WHERE product_id ="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//menghapus data dalam tabel product berdasarkan idproduct
app.delete('/api/users/:id', (req, res) => {
    let sql = "DELETE FROM user WHERE user_id ="+req.params.id +"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error":null, "response": results}));
    });
});

//menentukan port server yang digunakan
app.listen(3000, () =>{
    console.log("server berjalan di port : http://localhost:3000")
})