const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/employee" ).
then(()=>console.log("connection sucessful"))
.catch((e)=>console.log("cann't connected"));
