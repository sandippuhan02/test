const express = require("express");
const path = require("path");
const viewpath = path.join(__dirname,"./public/views");
const app = express();

app.set("views",viewpath);
app.set("view engine","ejs");

app.get("",(req,res)=>{
    let result = {
        name:"sandip",
        id:10,
        mob:12345,
        password:123
    }
    res.render("index",{result});
})

app.listen(4500,()=>console.log("port started on 4500"));

