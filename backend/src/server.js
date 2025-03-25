const express = require('express')
const dotenv=require("dotenv");
dotenv.config();
const userRouter=require("./routes/user");
const todoRouter=require("./routes/todos");
const mongoose=require("mongoose");
const app = express();
const PORT=process.env.PORT || 3000
const cors=require("cors");
app.use(cors());
app.use(express.json());



async function connectionDb() {
try{
 await mongoose.connect(`${process.env.MONGO_URL}`);
}
catch(err){
   process.exit(1);
  }
}


app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);







connectionDb().then(()=>{
  app.listen(PORT);
  console.log("connected");
})
