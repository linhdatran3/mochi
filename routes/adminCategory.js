const express=require('express')
const categoryModel=require('../models/categoryModel')
const router=express.Router()
router.get('/',async(req,res)=>{
    const categories=await categoryModel.find()

    res.render('admin/categories/list',{categories:categories,layout:'layouts/admin'})
})
router.delete('/:id',async(req,res)=>{

     try{
      const category=await categoryModel.findById(req.params.id)
       const cart=await categoryModel.findByIdAndDelete(req.params.id)
     //const cart=await categoryModel.findOneAndDelete({_id:req.params.id})
         res.redirect('/admin/category')
  }catch(e){
    console.log(e)
    res.redirect('/admin')
  }
})
router.get('/add',(req,res)=>{
    res.render('admin/categories/add',{layout:'layouts/admin'})
})
router.get('/edit/:id',async(req,res)=>{
  try {
    const category = await categoryModel.findById(req.params.id)
    res.render('admin/categories/edit',{category:category,layout:'layouts/admin'})
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
  
})
router.post('/',async(req,res)=>{
  try{
      const category=new categoryModel({
          name:req.body.name
      })
      
      await category.save()
    res.redirect('/admin/category')
  }catch(e){
    console.log(e)
    res.redirect('/admin')
  }
})
router.put('/edit/:id',async(req,res)=>{
  try{
      const category=await categoryModel.findByIdAndUpdate(req.params.id,{
          name:req.body.name
      })
    res.redirect('/admin/category')
  }catch(e){
    console.log(e)
    res.redirect('/admin')
  }
})
module.exports=router