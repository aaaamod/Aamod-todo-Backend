const motivationn=require("../data/motivation.json");

function motivation(req , res, next){
  const index=Math.floor(Math.random()*motivationn.length);
  req.quote=motivationn[index].text;
  next();
  }

module.exports=motivation