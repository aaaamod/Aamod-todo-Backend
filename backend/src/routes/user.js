const express=require("express");
const {userModel}=require("../model/todo");
const dotenv=require("dotenv")
dotenv.config();
const bcrypt=require("bcrypt");
const userRouter=express.Router();
const jwt=require("jsonwebtoken");
const authVerification = require("../middlewares/authmiddleware");
const JWT_SECRET=`${process.env.JWT_SECRET}`;
const {z}=require("zod");


userRouter.use(express.json());
let userData=[];
function rateLimitCheck(req, res, next){
  let i=0;
for( i=0;i<userData.length;i++){
  if(userData[i].ip==req.ip){
   if(userData[i].done>=30) return res.status(429).json({
    msg:"Too many request"
  })
  else {
    ++userData[i].done; next();return;}
  }
}
userData.push({
  ip:req.ip,
  done:1
})
next();
setTimeout(()=>{

  userData.splice(i,1);

  }, 60000)
}



userRouter.post("/signup",rateLimitCheck,async (req,res)=>{
  const bodyLook=z.object({
    name:z.string().regex(/^[A-Za-z\s]+$/, "Only letters are allowed").max(13).min(3),
    email:z.string().email({message:"invalid email"}),
    password:z.string().max(10).min(5)
  })
  try{
    bodyLook.parse(req.body);
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const hashPassword=await bcrypt.hash(password, 5);
    const newUser=await userModel.create({
      name,
      email,
      password:hashPassword
    })
   return res.status(200).json({
      msg:"signup done"
    });
  }
  catch(err){
    return res.status(500).json({
      msg:"db error",
      err:err.message,
    })
  }

});




userRouter.post("/signin",rateLimitCheck,async (req,res)=>{

  const bodyLook=z.object({
    name:z.string().regex(/^[A-Za-z\s]+$/, "Only letters are allowed").max(13).min(3),
    password:z.string().max(10).min(5)
  })
  try{
    bodyLook.parse(req.body);
  const username=req.body.name;
  const password=req.body.password;
   const find= await userModel.findOne({
      name:username
    });
    if(!find){
     return res.status(400).json({
        msg:"user not found"
      });
    }

 else if(find){
  const genuine=await bcrypt.compare(password,find.password );
  if(genuine){
    const token= jwt.sign({
      id:find._id
    },JWT_SECRET);
    return res.status(200).json({
      token,
      msg:"signin done"
    })
  }
  else res.json({
    msg:"error"
  })
  }}
  catch(err) {
  return res.status(400).json({
    msg:"db error",
    err:err.message
  });}
 
});



userRouter.get("/me",rateLimitCheck ,authVerification, async (req,res)=>{


  const id=req.id;
  try{
    const user=await userModel.findOne({_id:id});
    const todo=await userModel.findOne({_id:id}).populate("user_todos");
  
    res.status(200).json({
      msg:`your Profile`,
      todo:todo.user_todos
    });
  }
  catch(err){
    res.json({
      msg:err.message
    })
  }
  
  });

  

  module.exports= userRouter
  
