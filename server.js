const express = require('express'); // express.js for creating server
const path = require('path'); // find HTML, CSS files location
const bodyParser = require('body-parser'); // body-parser for sending/receiving data
const knex = require('knex'); // Knex for database access

// connect to database
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', // db host address
        user: 'postgres', // psql user name
        password: 'Son2452001#', // psql password
        database: 'loginform' // database name
    }
})

const app = express();

let initialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(initialPath)); // make HTML files path to static

// create backlinks
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(initialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, "register.html"));
})

// INSERT DATA INTO DATABASE
app.post('/register-user', (req, res) => {
    const {name, email, password} = req.body; // now can access variable 'name' by calling 'name' instead of 'req.body.name'

    // check if the input fields are empty or not
    if(!name.length || !email.length || !password.length){
        res.json('fill all fields');
    } else {
        // store data into database
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            // error when register with existed account (email)
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const{email, password} = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else {
            res.json('Incorrect email or password')
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000...')
})