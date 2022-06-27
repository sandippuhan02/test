const express = require("express");
const path = require("path");

require("./db/conn")
const static_path = path.join(__dirname, "../public");
const css_path = path.join(__dirname, "../public/css");
const view_path = path.join(__dirname, "../public/views");
console.log("current dir is " + static_path);

const app = express();
const registermodel = require("./models/registers");


app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", view_path);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("", (req, res) => {
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/login", (req, res) => {
    res.render("login");
});


// inserting new document to our database


app.post("/register", async (req, res) => {
  
    const password = req.body.inputpassword;
    const cpassword = req.body.inputcnfpassword;
    if (password === cpassword) {
        let data = new registermodel({
            name: req.body.inputname,
            age: req.body.inputage,
            email: req.body.inputemail,
            phone: req.body.inputphone,
            gender: req.body.gender,
            password: req.body.inputpassword,
            confirmpassword: req.body.inputcnfpassword


        });
       
        let result = await data.save();
        res.send("<h1>Thanks for registering......");
    }
    else
        res.send("password not matched");

 }
);

// for loin purpose
app.post("/login",async (req,res)=>{
    const lname = req.body.inputname;
    const lpassword = req.body.pass;
    console.log("form name :"+lname);
    console.log("login form password 1:"+lpassword); 

    let data = await  registermodel.findOne({name:lname});
    console.log("database password :"+data.password);
     if(data.password === lpassword)
     {
        console.log("sucess");
     }
     else{

         res.send("check password");
     }

   

   
    
   

    
    
});


app.listen(4500, () => {
    console.log("server started");
});
