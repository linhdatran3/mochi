const express=require('express')
const userModel=require('../models/userModel')
const router=express.Router()
const bcrypt=require('bcrypt')
const passport=require('passport')
function check(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/user/login')
}
// router.get('/',async(req,res)=>{
    
//         res.redirect('/')
    
// })
router.get('/profile',check,(req,res)=>{
    user=req.user
    if(req.user){
        value="Name: "+req.user.name
    }
    else{
        value="No Name"
    }
    res.render('users/profile',{value:value,user:user})
})
router.get('/register',(req,res)=>{
    res.render('users/register')
})
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/user/profile')
})
router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/user/login',
    failureFlash:true
}))

router.post('/register/',async(req,res)=>{
    try{
        const passwordHashed=await bcrypt.hash(req.body.password,10)
        const user=new userModel({
            name:req.body.name,
            email:req.body.email,
            password:passwordHashed,
            role:'user'
            
        })
        await user.save()
        req.flash("success","Insert sucessfully")
        res.redirect('/')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        res.redirect('/user')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback',passport.authenticate('google',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/login',
    failureFlash:true
}))
router.get('/github',passport.authenticate('github'))
router.get('/github/callback',passport.authenticate('github',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/login',
    failureFlash:true
}))
module.exports=router