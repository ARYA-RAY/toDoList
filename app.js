const express = require("express")
const bodyParser =  require("body-parser")

const app = express()
var items = ["Buy Food" , "Cook Food" , "Eat Food"]

app.set('view engine', 'ejs');   //templating for repeated html codes
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/",function(req,res){
    var today = new Date();
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long",
    };

    var day = today.toLocaleDateString("en-US",options);  //render todays date and use the options

    res.render('list', {theDay: day , newListItem: items});  //search in file list.ejs the variable theDay and send day in it
});

app.post("/",function(req,res){
    var item = req.body.newItem  //post the html input tag with name newItem
    items.push(item)
    res.redirect("/");           //send new task on todo list to  html 
});

app.listen(3000,function(){
    console.log("server running on port 3000")
});



