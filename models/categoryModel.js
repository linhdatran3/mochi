const mongoose=require('mongoose')
const productModel=require('./productModel')
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true,default:"Bánh Tráng Trộn"}
},{timestamps: true})
categorySchema.pre('remove',async function(next){
    try{
    const products=await productModel.find({category:this.id})
    if(products.length>0){
        console.log("test1")
        next(new Error("khong xoa duoc"))
    }
    }catch{
        console.log("test2")
        next()
    }
    // productModel.find({category:this.id},(err,products)=>{
    //     if(err){
    //         next(err)
    //     }
    //     else if(products.length>0){
    //         console.log("test")
    //         next(new Error("khong xoa duoc"))
    //     }
    //     else{
    //         next()
    //     }
    // })
})
module.exports=mongoose.model('category',categorySchema)