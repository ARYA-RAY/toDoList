const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.set('view engine', 'ejs');   //templating for repeated html codes
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true })

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
    name: "Welcome to To-Do-List"
});

const item2 = new Item({
    name: "Click on + to add new item"
});

const item3 = new Item({
    name: "Hit this to delete item"
});

const defaultItems = [item1, item2, item3]

app.get("/", function (req, res) {
    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Successful")
                }
            });
            res.redirect("/")
        }
        else{
            res.render("list", { listTitle: "Today", newListItem: foundItems });  //search in file list.ejs the variable theDay and send day in it
        }
    });
});

app.post("/", function (req, res) {
    const itemName = req.body.newItem  //post the html input tag with name newItem

    const item = new Item({
        name: itemName
    });
    item.save()
    res.redirect("/")
});

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox

    Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err){
            console.log("Successfully deleted")
            res.redirect("/")
        }
    })
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.listen(3000, function () {
    console.log("server running on port 3000")
});



