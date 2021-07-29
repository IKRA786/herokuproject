const express=require("express")
const path=require("path")
const app=express();
const port=8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ContactDance', {useNewUrlParser: true, useUnifiedTopology: true});
var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
  const Contact = mongoose.model('Contact', ContactSchema);


app.use("/static",express.static('static'))
app.use(express.urlencoded())
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
app.get("/",(req,res)=>
{
    const con=""
    const params={}
    res.status(200).render("home.pug",params)
})

app.get("/contact",(req,res)=>
{
    const con=""
    const params={}
    res.status(200).render("contact.pug",params)
})
app.post("/contact",(req,res)=>
{
    var mydata=new Contact(req.body)
    mydata.save().then(()=>{
        res.send("This item has been recorded sucessfully")
    }).catch(()=>{
        res.status(400).send("Item not saved to the database")
    })
})
app.listen(port,()=>{
    console.log(`application started sucessfully at ${port}`)
})