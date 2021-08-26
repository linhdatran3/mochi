const express=require('express')
const router=express.Router()
const userModel=require('../models/userModel')
const orderModel=require('../models/orderModel')
const bcrypt=require('bcrypt')
const passport=require('passport')
function check(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/admin/login')
}
router.get('/',async(req,res)=>{
    if(req.user){
        nameAdmin=req.user.name  
        role=req.user.role
        if(role=='admin'){
            res.render('admin/index', {nameAdmin:nameAdmin,layout:'layouts/admin'})        
        }
        else{
            nameAdmin=''
             res.render('admin/accounts/login', {layout:false})
        }          
    }
    else
    {
        nameAdmin=''
        res.render('admin/accounts/login', {layout:false})
    }
    
})
router.get('/account',async(req,res)=>{
    try{
        const users=await userModel.find()
        res.render('admin/accounts/list',{users:users,layout:'layouts/admin'})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/order',async(req,res)=>{
    try{
        const orders=await orderModel.find().populate('user',['name'])
        
        res.render('admin/order/list',{orders:orders,layout:'layouts/admin'})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.delete('/account/:id',async(req,res)=>{
    try{
        const users=await userModel.findByIdAndDelete(req.params.id)
        res.redirect('/admin/account')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/login',async(req,res)=>{
    res.render('admin/accounts/list',{layout:'layouts/admin'})
    
})
router.post('/login',passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/admin/login',
    failureFlash:true
}))
router.get('/register',(req,res)=>{
    res.render('admin/accounts/register',{layout:false})
})
router.post('/register/',async(req,res)=>{
    try{
        const passwordHashed=await bcrypt.hash(req.body.password,10)
        const user=new userModel({
            name:req.body.name,
            email:req.body.email,
            password:passwordHashed,
            role:req.body.role
        })
        console.log(user)
        await user.save()
        res.render('admin/index',{user:user,layout:'layouts/admin'})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
module.exports=router