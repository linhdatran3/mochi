const express=require('express')
const productModel=require('../models/productModel')
const categoryModel=require('../models/categoryModel')
const userModel=require('../models/userModel')
const router=express.Router()
router.get('/',async(req,res)=>{
    try{
        if(req.user){
            if(req.user.role == 'user')
            {
               user=req.user
                nameCus=req.user.name 
                res.render('index',{nameCus:nameCus,user:user})
             
            }  
        }else{
            nameCus=''
            res.render('index')
        }
           
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/shop',async(req,res)=>{
    try{
        const products=await productModel.find().populate('category',['name'])
        res.render('shops/shop',{products:products})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/shop/:id',async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id).populate('category',['name'])
        
        res.render('shops/item',{product:product})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
module.exports=router