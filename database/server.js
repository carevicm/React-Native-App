const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
//app.use(bodyParser.json())
app.use(express.json());

// MySQL
const pool  = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'geeky-deals',
});

pool.query('select * from user', (req, res) => {
    console.log(process.env.PORT);
    return console.log(res);
});



// Get all users
app.get('/user', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from user', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from users table are: \n', rows)
        })
    })
});

app.post('/login', (req, res) => {
    //console.log(req.body);
    let email = req.body.Email;
    let password = req.body.Password;
    console.log(email);
    console.log(password);
    pool.getConnection((err, connection) => {
        //let email = req.body.email;
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from user WHERE email=?', email, (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                if(Array.isArray(rows) && rows.length){
                    console.log(rows[0].password);
                    if(password != rows[0].password){
                        console.log("Password is not valid");
                        const jsonRes = JSON.stringify({code: "1"});
                        res.send(jsonRes);
                    }
                    else{
                        console.log("Password is valid");
                        const jsonRes = JSON.stringify({code: "0", id: rows[0].id, firstname: rows[0].first_name, lastname: rows[0].last_name, email: rows[0].email, createdAt: rows[0].created_at});
                        res.send(jsonRes);
                    }
                }else{
                    console.log("There is no user with that email.");
                    const jsonRes = JSON.stringify({code: "2"});
                    res.send(jsonRes);
                }
                
                //res.send(rows);
            } else {
                console.log(err);
                const jsonRes = JSON.stringify({code: "3"});
                res.send(jsonRes);
            }

            // if(err) throw err
            console.log('The data from login page : \n', rows);
        })
    })
});

app.post('/register', (req, res) => {
    //console.log(req.body);
    let email = req.body.email;
    console.log(req.body);
    pool.getConnection((err, connection) => {
        //let email = req.body.email;
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from user WHERE email=?', email, (err, rows) => {
            //connection.release() // return the connection to pool

            if (!err) {
                if(Array.isArray(rows) && rows.length){
                    console.log("User with this email already exists in database.");
                    const jsonRes = JSON.stringify({code: "1"});
                    res.send(jsonRes);
                    
                }else{
                    let params = req.body;
                    console.log("There is no user with that email.");
                    connection.query('INSERT INTO user SET ?', params, (err, rows) => {
                        connection.release(); //return the connection to pool

                        if (!err) {
                            console.log("Register is successful.");
                            const jsonRes = JSON.stringify({code: "0"});
                            res.send(jsonRes);
                        } else {
                            console.log(err);
                            const jsonRes = JSON.stringify({code: "3"});
                            res.send(jsonRes);
                        }
                        

                    })
                }
                
            } else {
                console.log(err);
                const jsonRes = JSON.stringify({code: "3"});
                res.send(jsonRes);
            }

            // if(err) throw err
            console.log('The data from register page : \n', rows);
        })
    })
});

app.get('/darijo', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from user WHERE id=27', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data fromusers table are: \n', rows)
        })
    })
});



app.post('/test/Id/:id', function(req, res) {
  //const email = req.body.Email;
  //const password = req.body.Password;
  console.log("proslo");
  console.log(req.body);
  console.log("zavrseno");

  res.send({
    data: req.body,
    params: {
        id: req.params.id
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));