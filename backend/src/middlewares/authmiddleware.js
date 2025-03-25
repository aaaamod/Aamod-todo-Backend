const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config();
const JWT_SECRET=`${process.env.JWT_SECRET}`;


function authVerification(req, res, next){

  const token=req.headers.authorization;
  try{
    const value =jwt.verify(token , JWT_SECRET);
    req.id=value.id;
    next();
  }
  catch(err){
    return res.status(401).json({
      msg:"signin again , token expired",
      err:err.message
    })
  }
}

module.exports=authVerification;