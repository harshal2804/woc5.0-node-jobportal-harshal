const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();
const authRoute = require('./auth')

require('dotenv').config()

mongoose.set('strictQuery', true);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())
// app.use(express.json())
app.use('/Student/auth', authRoute)


mongoose.connect('mongodb://127.0.0.1:27017/JobPortal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));


app.post("/Student", async (req, res) => {
    console.log(req.body)
    try {
        const user = await db.collection('StudentDetails').findOne({ email:req.body.email })
        console.log(user)
        if(user){
            return res.json({ status:'error', user:false })
        }

        const accessToken = jwt.sign(req.body.email, process.env.ACCESS_TOKEN_SECRET)

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword);
        const data = { ...req.body, password: hashedPassword };

        db.collection('StudentDetails').insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("Student signed up successfully!");
        });
        res.json({ status: 'ok', user: true, accessToken: accessToken })
    } catch {
        res.json({ status: 'error' })
    }


})

app.post("/Student/login", async (req, res) => {
    const student = await db.collection('StudentDetails').findOne({ email: req.body.email });
    if (student == null) {
        res.json({ status: 'error', user: false })
    }
    try {
        if (await bcrypt.compare(req.body.password, student.password)) {
            const accessToken = jwt.sign(req.body.email, process.env.ACCESS_TOKEN_SECRET)
            res.json({ status: 'ok', user: true, accessToken:accessToken })
        }
        else {
            res.json({ status: 'error', user: false })
        }
    } catch {
        res.status(500).send()
    }
})

app.get("/StudentDetails", authenticateToken, async (req, res) => {

    const student = await db.collection('StudentDetails').findOne({ email: req.email })
    res.json(student)
})

app.post("/Company", async (req, res) => {

    // var data = req.body
    // data = {...data, requiredCpi: parseInt(req.body.requiredCpi, 10)}

    // db.collection('CompanyDetails').insertOne(data, (err, collection) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Record Inserted Successfully");
    // });
    // return res.redirect('Home.js')
    try {
        const user = await db.collection('CompanyDetails').findOne({ email:req.body.email })
        console.log(user)
        if(user){
            return res.json({ status:'error', user:false })
        }

        const accessToken = jwt.sign(req.body.email, process.env.ACCESS_TOKEN_SECRET)

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword);
        const data = { ...req.body, password: hashedPassword };

        db.collection('CompanyDetails').insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("Company signed up successfully!");
        });
        res.json({ status: 'ok', user: true, accessToken: accessToken })
    } catch {
        res.json({ status: 'error' })
    }
})

app.post("/Company/login", async (req, res) => {
    const company = await db.collection('CompanyDetails').findOne({ email: req.body.email });
    if (company == null) {
        res.json({ status: 'error', user: false })
    }
    try {
        if (await bcrypt.compare(req.body.password, company.password)) {
            const accessToken = jwt.sign(req.body.email, process.env.ACCESS_TOKEN_SECRET)
            res.json({ status: 'ok', user: true, accessToken:accessToken })
        }
        else {
            res.json({ status: 'error', user: false })
        }
    } catch {
        res.status(500).send()
    }
})

app.get("/CompanyDetails", authenticateToken, async (req, res) => {

    const student = await db.collection('CompanyDetails').findOne({ email: req.email })
    res.json(student)
})

app.get("/CompanyList", async (req, res) => {
    const student = req.query
    console.log(typeof(student.cpi))
    db.collection('CompanyDetails').find({ requiredCpi: { $lt: parseFloat(student.cpi, 10) }} ).toArray((err, result) => {
        if (err) {
            res.status(400).send("Error in fetching!")
        }
        else{
            res.json(result);
        }
    })
})

function authenticateToken(req, res, next) {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.json({ status: 'error' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
        if (err) return res.json({ status: 'error' })
        req.email = email
        next()
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));