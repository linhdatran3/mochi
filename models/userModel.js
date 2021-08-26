const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    phone:{type:String, require:true , default:"123"},
    address:{type:String, require:true, default:"địa chỉ 1"}
})
module.exports=mongoose.model('user',userSchema)