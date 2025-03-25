const express=require("express");
const {todoModel, userModel}=require("../model/todo");
const authVerification = require("../middlewares/authmiddleware");
const motivationMiddleware=require("../middlewares/motivationMiddle");
const { compareSync } = require("bcrypt");
const { use } = require("./user");
const todoRouter=express.Router();

todoRouter.use(express.json());


let userData=[];
function rateLimitCheck(req, res, next){
 
  let i=0;
for( i=0;i<userData.length;i++){
  if(userData[i].ip==req.ip){
   if(userData[i].done>=15) return res.status(429).json({
    msg:"Too many request"
  })
  else {
    ++userData[i].done; next();return;}
  }
}
userData.push({
  ip:req.ip,
  done:0
})
setTimeout(()=>{

  userData.splice(i,1);

  }, 60000)
}






todoRouter.post("/create",rateLimitCheck,authVerification,motivationMiddleware,async (req,res)=>{

  const title=req.body.title;
  const isComplete=req.body.isComplete;
 try{
  const userr=await userModel.findOne({_id:req.id});
  if(userr){
  const todo=await todoModel.create({
    title,
    isComplete
  });
 const user=await userModel.updateOne({_id:req.id},{$push:{user_todos:todo._id}})
  return res.status(201).json({
    msg:"todo created",
    quote:req.quote,
    todoId:todo._id
  });
}
else return res.json({
  msg:"user not found"
})
  }
  catch(err){
    return res.status(500).json({
      msg:err.message
    })
  }

 
});

todoRouter.delete("/delete/:id",rateLimitCheck,authVerification,async (req, res)=>{
  const todoId= req.params.id;
  const user=await userModel.findOne({_id:req.id});

 try{
  if((user.user_todos.includes(todoId))){
  await userModel.updateOne({_id:req.id},{$pull:{user_todos:todoId}});
  await todoModel.deleteOne({_id:todoId});
  res.status(200).json({
    msg:"deleted"
  });}
  else {
    res.json({
      msg:"not authorised"
    })
  }
 }
 catch(err){
  res.json({
    msg:err.message
  })
 }
    
});


todoRouter.put("/update/:id",rateLimitCheck,authVerification,async (req,res)=>{
 const todoId= req.params.id;
 const id=req.id
 const title=req.body.title;
 const isComplete=req.body.isComplete;

try{
  const user=await userModel.findOne({_id:id});
  if((user.user_todos.includes(todoId))){
  await todoModel.updateOne({_id:todoId},{$set:{
    title,
    isComplete
  }});
    res.status(200).json({
      msg:"update done"
    });}
    else{
      return res.json({
        msg:"not authorized"
      })
    }
}
catch(err){
  res.status(500).json({
    msg:err.message
  })
}
});

module.exports=todoRouter
