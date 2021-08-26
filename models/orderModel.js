const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    cart:{type:Object,require:true},
    address:{type:String, require:true},
   created_at:{ type: Date, required: true, default: Date.now }
})
module.exports=mongoose.model('order',orderSchema)