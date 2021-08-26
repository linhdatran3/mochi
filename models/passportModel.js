const localStrategy=require('passport-local').Strategy
const userModel=require('./userModel')
const bcrypt=require('bcrypt')
const googleStrategy=require('passport-google-oauth20').Strategy
const githubStrategy=require('passport-github').Strategy
module.exports=function(passport){
   
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser(async(id,done)=>{
        try{
            const user=await userModel.findById(id)
            return done(null,user)
        }catch(e){
            console.log(e)
            return done(e)
        }
    })
  passport.use(new localStrategy(
         {
            usernameField:'email',
            passwordField:'password'
          
        },
        async function(email,password,done){
            const user=await userModel.findOne({'email':email})
            if(!user){
                return done(null,false,{message:"No user with that email"})
            }
            try{
                if(await bcrypt.compare(password,user.password)){
                    return done(null,user,{message:"Login successfully"})
                }
                return done(null,false,{message:"password incorrect"})
            }catch(e){
                return done(e)
            }
        }
  ))
  passport.use(new githubStrategy({
    clientID:"ffb44ad2c7d86f948ac6",
        clientSecret:"064939af96a1d41ceef7b04f97496fc6ef584205",
        callbackURL:"http://localhost:3000/user/github/callback"
},
async function(accessToken,refreshToken,profile,done){
    
    try{
        const user=await userModel.findOne({email:profile._json.email})
        if(user) return done(null,user)
        const newUser=new userModel({
            name:profile._json.login,
            email:profile._json.url,
            pasword:""
        })
        await newUser.save()
        return done(null, newUser)
    }catch(e){
        console.log(e)
        return done(e)
    }
    
}
))


passport.use(new googleStrategy({
        clientID:"548465010244-i0n3svejadseg8ouq1kpph0ep083sldi.apps.googleusercontent.com",
        clientSecret:"c6ZfPTMOtzIKkIoIye9Ly2HI",
        callbackURL:"http://localhost:3000/user/google/callback"
    },
    async function(accessToken,refreshToken,profile,done){
        
        try{
            const user=await userModel.findOne({email:profile._json.email})
            if(user) return done(null,user)
            const newUser=new userModel({
                id:profile._json.sub,
                name:profile._json.name,
                email:profile._json.email,
                pasword:""
            })
            await newUser.save()
            return done(null, newUser)
        }catch(e){
            console.log(e)
            return done(e)
        }
        
    }
))
   

}
