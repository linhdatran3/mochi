const express=require('express')
const categoryModel=require('../models/categoryModel')

const productModel=require('../models/productModel')
const router=express.Router()
router.get('/',async(req,res)=>{
    const products=await productModel.find().populate('category',['name'])
  //  console.log(products)
    res.render('admin/products/list',{products:products,layout:'layouts/admin'})
})
router.get('/add',async(req,res)=>{
    try{
        const product=new productModel()
        const categories=await categoryModel.find()
        res.render('admin/products/add',{categories:categories,product:product,layout:'layouts/admin'})
    }catch(e){
        console.log(e)
        res.redirect('/admin')
    }
    
})
router.get('/edit/:id',async(req,res)=>{
  try {
    const product = await productModel.findById(req.params.id)
    const categories=await categoryModel.find()
    res.render('admin/products/edit',{categories:categories,product:product,layout:'layouts/admin'})
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})
router.post('/',async(req,res)=>{
  try{
      const product=new productModel({
          name:req.body.name,
          price:req.body.price,
          quantity:req.body.quantity,
          info:req.body.info,
          category:req.body.category
      })
      console.log("add")
      const imageEncode=JSON.parse(req.body.image)

      product.imageData =new Buffer.from(imageEncode.data,'base64')
      product.imageType= imageEncode.type
      product.image=`data:${product.imageType};charser=utf-8;base64,${product.imageData.toString('base64')}`
      
      await product.save()
    res.redirect('/admin/product')
  }catch(e){
    console.log(e)
    res.redirect('/admin')
  }
})
router.put('/edit/:id',async(req,res)=>{
  try{
      const product=await productModel.findByIdAndUpdate(req.params.id,{
          name:req.body.name,
          price:req.body.price,
          quantity:req.body.quantity,
          info:req.body.info,
          category:req.body.category,
          // imageData:new Buffer.from(imageEncode.data,'base64'),
          // imageType:imageEncode.type,
          // image:`data:${product.imageType};charser=utf-8;base64,${product.imageData.toString('base64')}`
      })
      // console.log("add")
      // const imageEncode=JSON.parse(req.body.image)
     

      // product.imageData =new Buffer.from(imageEncode.data,'base64')
      // product.imageType= imageEncode.type
      // product.image=`data:${product.imageType};charser=utf-8;base64,${product.imageData.toString('base64')}`
      
      // await product.save()
    res.redirect('/admin/product')
  }catch(e){
    console.log(e)
    res.redirect('/admin')
  }
})
router.delete('/:id',async(req,res)=>{

  try{
   const product=await productModel.findById(req.params.id)
   product.remove()
      res.redirect('/admin/product')
  }catch(e){
  console.log(e)
  res.redirect('/admin')
  }
})

module.exports=router