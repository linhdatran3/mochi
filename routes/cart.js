const express=require('express')
const productModel=require('../models/productModel')
const cartModel=require('../models/cartModel')
const orderModel = require('../models/orderModel')
const paypal = require('paypal-rest-sdk')
const router=express.Router()
router.get('/',(req,res)=>{
    try{
        // req.session.cart=null
        let items=[]
        let total_price=0
        if(req.session.cart){
           items=req.session.cart.items
           total_price=req.session.cart.total_price
        } 
        res.render('carts/cart',{cart:items,total_price:total_price})

    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/add/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const product=await productModel.findById(id)
        const cart=new cartModel(req.session.cart ? req.session.cart : {items:[]})
        cart.add(product,id)
         req.session.cart=cart 
        res.send("Add Successfully")
        //res.redirect('/cart')
    }catch(e){
        res.send("Add failed")
        console.log(e)
        res.redirect('/')
    }
})
function check(req,res,next){
    if(req.isAuthenticated())
        return next()
    res.redirect('/user/login')
}
router.get('/checkout',(req,res)=>{
    user=req.user
    if(!req.session.cart)
        res.render('/cart')
    const cart=new cartModel(req.session.cart ? req.session.cart : {items:[]})
    
    const total = new Intl.NumberFormat().format(cart.total_price)
    res.render('carts/checkout',{products:cart.items, total:total,user:user})
})
router.get('/pay',(req,res)=>{

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/cart/success",
            "cancel_url": "http://localhost:3000/cart/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "20.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "20.00"
            },
            "description": "The book."
        }]
    }



    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            // throw error;
            console.log(error)
        } else {
            for(let i=0;i<payment.links.length;i++){  
                 if(payment.links[i].rel==='approval_url'){
                    res.redirect(payment.links[i].href)
                }
            }
        }
    })
})
router.get('/cancel',(req,res)=>{
    res.send("cancel")
})
router.get('/success',(req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "20.00"
            }
        }]
    }
    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            req.flash("success","paypal succesfully")
            res.redirect('/')
        }
    });
})
router.post('/order',check,async(req,res)=>{
    try{
        const cart=new cartModel(req.session.cart)
        const order=new orderModel({
            user:req.user,
            cart:cart,
            address:req.body.address,
            phone:req.body.phone
        })
        req.session.cart=null
        req.flash("success","Order succesfully")
        await order.save()
        res.redirect('/')
    }catch(e){
        console.log(e)
        res.redirect('/cart/checkout')
    }
    
})
router.delete('/:id',(req,res)=>{
    try{
        const id=req.params.id
        const cart=new cartModel(req.session.cart)
        cart.delete(id)
        req.session.cart=cart 
        res.send("Delete Successfully")
        res.redirect('/cart')
    }catch(e){
        res.send("delete failed")
        console.log(e)
       // res.redirect('/')
    }
})
router.put('/reduce/:id',(req,res)=>{
    try{
        const id=req.params.id
        const cart=new cartModel(req.session.cart)
        cart.reduce(id)
        req.session.cart=cart 
        res.send("Update successfully")
        res.redirect('/cart')
    }catch(e){
        res.send("update failed")
        console.log(e)
       // res.redirect('/')
    }
})
router.put('/increase/:id',(req,res)=>{
    try{
        const id=req.params.id
        const cart=new cartModel(req.session.cart)
        cart.increase(id)
        req.session.cart=cart 
        res.send("Update successfully")
        res.redirect('/cart')
    }catch(e){
        res.send("update failed")
        console.log(e)
       // res.redirect('/')
    }
})
module.exports=router