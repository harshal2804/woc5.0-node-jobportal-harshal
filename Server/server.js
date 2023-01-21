const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/Student", (req, res) => {
    var name = req.body.fullname;
    var email = req.body.email;

    var data = {
        "name": name,
        "email": email
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
})

app.get("/Student",(req, res) => {
    res.end("<h1>Hello form server</h1>")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));