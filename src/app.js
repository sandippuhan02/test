const express = require("express");
const path = require("path");

require("./db/conn")
const static_path = path.join(__dirname, "../public");
const css_path = path.join(__dirname, "../public/css");
const view_path = path.join(__dirname, "../public/views");

console.log("current dir is " + static_path);



const app = express();
const registermodel = require("./models/registers");
const pendingModel = require("./models/pending");


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
app.get("/adminlog", (req, res) => {
    res.render("adminlogform");
});


// inserting new document to our database


app.post("/register", async (req, res) => {

    const password = req.body.inputpassword;
    const cpassword = req.body.inputcnfpassword;
    let a = req.body.dept;
    console.log("dept is"+a);
    
    if (password === cpassword) {
        let data = new pendingModel({
            name: req.body.inputname,
            age: req.body.inputage,
            email: req.body.inputemail,
            phone: req.body.inputphone,
            gender: req.body.gender,
            department:req.body.dept,
            password: req.body.inputpassword,
            confirmpassword: req.body.inputcnfpassword,


        });

        let result = await data.save();
       
        
        res.redirect('/');


    }
    else
        res.send("password not matched");

}
);

// for patient login purpose
app.post("/login", async (req, res) => {
    const lname = req.body.inputname;
    const lpassword = req.body.pass;
    console.log("form name :" + lname);
    console.log("login form password 1:" + lpassword);

    let data = await registermodel.findOne({ name: lname });
    console.log("database password :" + data.password);
    if (data.password === parseInt(lpassword)) {
        console.log("sucess");
    }
    else {

        res.send("check password");
    }
})
app.post("/adminlog", (req, res) => {
    let formname = req.body.ainputname;
    let formpassword = req.body.apass;
    if (formname === "sandip" && formpassword === '123') {

        res.render("admin");
    }
    else {
        res.send("error");
    }
})

app.get('/adminlog/request',async(req,res)=>{
    let abc = await pendingModel.find();
    console.log(abc);
    // res.render('request',{abc:abc})
     res.render('request',{abc:abc}); 
})


/*/dummy database to original*/
app.post('/registers',async(req,res)=>{
    let pendingData = await pendingModel.findOne({_id:req.body.pendingId}); 
   
    pendingData = {
        name : pendingData.name,
        email : pendingData.email,
        gender : pendingData.gender,
        phone : pendingData.phone,
        department:pendingData.dept,
        age : pendingData.age,
        password : pendingData.password
    }
    let newData = new registermodel(pendingData);
    await newData.save();
    await pendingModel.deleteOne({_id:req.body.pendingId});
    res.redirect('/adminlog/request')
   
})
/*original data*/
// app.post('/registers',async(req,res)=>{
//     let pendingData = await pendingModel.findOne({_id:req.body.pendingId}); 
//     pendingData = {
//         name : pendingData.name,
//         email : pendingData.email,
//         gender : pendingData.gender,
//         phone : pendingData.phone,
     
//         age : pendingData.age,
//         password : pendingData.password
//     }
//     let newData = new registermodel(pendingData);
//     await newData.save();
//     await pendingModel.deleteOne({_id:req.body.pendingId});
//     res.redirect('/adminlog/request')
// })


app.post('/delete',async (req,res)=>{
    await pendingModel.deleteOne({_id:req.body.pendingId});
    res.redirect('/adminlog/request')
});

/*for admin viewpatient section*/
app.get("/adminlog/vp",async(req,res)=>{
    let data = await registermodel.find() ;
    // res.send(data);
-
    res.render("viewpatient",{data:data});
    
 
})

app.listen(3000, () => {
    console.log("server started on port 3000");
});