//jshint esversion:6
require("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const session = require('express-session');
const passport =require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const findOrCreate=require("mongoose-findorcreate");


const app=express();

const port=process.env.PORT || 3000



mongoose.connect("mongodb+srv://moemensfaxi10:vSe90aXDJaXXqlJS@database.rgdiydh.mongodb.net/?retryWrites=true&w=majority")





app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))

const Photography=new mongoose.Schema({
    name:String,
    price:mongoose.Types.Decimal128,
    imgUrl:String
}); 

const Photo=mongoose.model("Photo",Photography);
app.get("/",function(req,res){
    res.render("home")
})

app.get("/buy/:itemid",async function(req,res){
    const requestedTitle = req.params.itemid;
    const items=await Photo.find({})
    console.log(items);
    res.render("buy")
    /*
    items.forEach(function(item){
   
        if (item._id.toString() === requestedTitle) {
          res.render("post", {});
        }
      })*/
});
app.post("/buy/:itemid",async function(req,res){
    const requestedTitle = req.params.itemid;
    res.redirect("/buy/"+requestedTitle)
});

app.get("/gallery",async function(req,res){
    const items=await Photo.find({})
    res.render("gallery",{items:items})
})
app.use(express.static("public"));

app.listen(port,function(){
    console.log(`The Server is Running at port ${port}`);
})