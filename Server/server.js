const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json())
app.use(express.static('../client/public'))
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cors())


mongoose.connect('mongodb://localhost:27017/JobPortal',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/",(req, res) => {
    console.log(`Hello ${req.body.name}`);
})

app.post("/Student", (req, res) => {

    var data = {
        "name": req.body.name,
        "email": req.body.email,
        "password":  req.body.password,
        "confirmPassword": req.body.confirmPassword,
        "batch": req.body.batch,
        "cpi": req.body.cpi,
        "age": req.body.age,
        "male": req.body.male,
        "female": req.body.female,
        "other": req.body.other,
        "techStack": req.body.techStack
    }

    db.collection('StudentDetails').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('Home.js')
})

app.post("/Company", (req, res) => {

    var data = {
        "companyName": req.body.companyName,
        "email": req.body.email,
        "password":  req.body.password,
        "confirmPassword": req.body.confirmPassword,
        "requiredAge": req.body.requiredAge,
        "requiredCpi": req.body.requiredCpi,
        "officialWebsite": req.body.officialWebsite,
        "position": req.body.position,
        "package": req.body.package,
        "description": req.body.description
    }

    db.collection('CompanyDetails').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('Home.js')
})

app.get("/",(req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.end("<h1>Hello form server</h1>")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));