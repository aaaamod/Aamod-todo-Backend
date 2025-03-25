const mongoose=require("mongoose");

const schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;


const user=new schema({
  name:{
    type:String , required:true , minlengh:10 , maxlength:20,unique:true
  },
  email:{
    type:String, unique:true 
  },
  password:{
    type:String , required:true , minlengh:10 , maxlength:100,unique:true
  },
  user_todos:[{
    type:ObjectId,
    ref:'todos'
  }]
});
const todo=new schema({
  title:{
    type:String , required:true , minlengh:10
  },
  isComplete:{
    type:Boolean , default:false
  }
});

const userModel=mongoose.model("users" ,user);
const todoModel=mongoose.model("todos" ,todo);

module.exports={
  userModel,
  todoModel
}