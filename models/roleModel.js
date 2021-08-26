const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    name:{type:String, require:true, default:"user"}
})
module.exports=mongoose.model('role',orderSchema)