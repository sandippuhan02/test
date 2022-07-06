const mongoose = require("mongoose");
const doctorsSchema = new mongoose.Schema({
   department:String,
   name:String,
  
});
module.exports = mongoose.model("appoints", doctorsSchema);
 