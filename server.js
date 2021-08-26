const express=require('express')
require('dotenv').config()
const expressLayouts=require('express-ejs-layouts')
const methodOverride = require('method-override')
const mongoose=require('mongoose')
const session=require('express-session')
const passport=require('passport')
require('./models/passportModel')(passport)
const flash=require('express-flash')
const MongoStore = require("mongo-store")

const adminCategoryRouter=require('./routes/adminCategory')
const adminProductRouter=require('./routes/adminProduct')
const adminBaseRouter=require('./routes/adminBase')

const indexRouter=require('./routes/index')
const userRouter=require('./routes/user')
const cartRouter=require('./routes/cart') 


const app= express()

app.use(flash())

app.set('view engine', 'ejs')



app.set('layout','layouts/layout')
app.set('view options', {layout:'layouts/admin'})
app.use(expressLayouts)
app.use(express.static('public'))

app.use(express.json());

const connectFunction=async()=>{
try{
    await mongoose.connect(process.env.STR_CONNECT,{
        useNewUrlParser: true,
        useUnifiedTopology: true
       
      })
    console.log("connected successfully")
}catch(e){
    console.log('connection failed')
    console.log(e.message)
}}
connectFunction()


app.use(express.urlencoded({ limit: '10mb',extended: false }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  
  cookie: { maxAge: 20*120*60*60}
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})
app.use(passport.initialize())
app.use(passport.session())


app.use('/admin',adminBaseRouter)
app.use('/admin/category',adminCategoryRouter)
app.use('/admin/product',adminProductRouter)

app.use('/',indexRouter)
app.use('/cart',cartRouter)
app.use('/user',userRouter)

//app.listen(3000)
app.listen(process.env.PORT || 3000)