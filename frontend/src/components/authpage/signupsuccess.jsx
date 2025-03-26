import {  useRecoilValue, useSetRecoilState } from "recoil";
//import { auth} from "../../stores/atoms/authAtoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginHead, signupHead } from "../../stores/atoms/authAtoms";


export function SignupSuccess(){
   const nav=useNavigate();
   const loginSet=useSetRecoilState(loginHead);
   const signupSet=useSetRecoilState(signupHead)
   function navigation(){
    loginSet(true);
    signupSet(false)
      nav("../auth")
   
   }

  
  return <div className="self-center bg-sate-500 h-2/3 mt-40">
<div className="flex flex-col justify-center">
  <Image/>
  <span className="font-bold text-white self-center font-sans text-3xl mb-10">SignUp Successful!</span>
  <button onClick={()=>{
    navigation();
  }} className="bg-blue-500 rounded text-white border-none py-2 ">Go to Login</button>
</div>
  </div>
   
}



function Image(){
  return  <div className="self-center">
  <img className="h-20 w-20" src="https://img.icons8.com/?size=100&id=82818&format=png&color=228BE6"  />
  </div>
}