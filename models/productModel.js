const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    name:{type:String,require:true,default:"Bút mực đỏ"},
    info:{type:String,default:"Bút thiên long chất lượng cao"},
    quantity:{type:Number,require:true,default:5},
    price:{type:Number,require:true,default:20000},
    category:{type:mongoose.Schema.Types.ObjectId,require:true,ref:"category"},
    imageData:{type:Buffer},
    imageType:{type:String},
    image:{type:String}
},{timestams:true})

module.exports=mongoose.model('product',productSchema)