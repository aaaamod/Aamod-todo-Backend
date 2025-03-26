import { useEffect, useRef } from "react";
import {   loginHead, signupHead, singninButton } from "../../stores/atoms/authAtoms";
import {
  useRecoilState,
  useSetRecoilState,

} from "recoil";

import { useNavigate} from "react-router-dom";




export function Login() {
  const setSignupValue = useSetRecoilState(signupHead);
  const [loginValue, setLoginValue] = useRecoilState(loginHead);
 
  const borderColor = useRef();
 
  useEffect(() => {
    if (loginValue) {

      borderColor.current.classList.add("text-blue-500");
      borderColor.current.classList.add("border-b-blue-300");
      borderColor.current.classList.add("border-b-2");
      setSignupValue(false);
    } else {
   
      borderColor.current.classList.remove("text-blue-500");
      borderColor.current.classList.remove("border-b-blue-300");
      borderColor.current.classList.remove("border-b-2");
    }
  }, [loginValue, setSignupValue]);

  return (
    <>

      <button
        onClick={() => {
          setLoginValue(true);
        }}
        ref={borderColor}
        className="text-gray-30 bg-transparent border-x-0 border-y-0 flex-1 font-sans  text-sm  font-medium pb-3"
      >
        Login
      </button>
    </>
  );
}


export  function LoginDetail() {
const nav=useNavigate();
const checkboxx=useRef();
 const signinB=useSetRecoilState(singninButton)
const namee=useRef();
const passwordd=useRef();
async function navigate(){
  const name=namee.current.value;
  const password=passwordd.current.value;
 if(name!="" && password!=""){
  const response=await fetch("https://todo-backendd.vercel.app/api/v1/user/signin",{
    method:"POST",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      password
    })
  })
  const data=await response.json();

  if(data.msg=="db error"){
   
    let parsedError=JSON.parse(data.err);
 if(parsedError[0].path[0]=="password"){
      passwordd.current.value="";
      passwordd.current.placeholder="Enter valid password";
      passwordd.current.focus();
      passwordd.current.classList.add("placeholder:text-orange-400")
    }
  else if(parsedError[0].path[0]=="name"){
      namee.current.value="";
      namee.current.placeholder="Enter valid name";
      namee.current.focus();
      namee.current.classList.add("placeholder:text-orange-400")
    }
   }
  else if(response.status!=400){
    localStorage.setItem("token",data.token)
    signinB(false)
    nav("../LoginDone")
  }
  else if(data.msg=="Too many request"){
    alert("Too many request , tryagain after sometime")
    setTimeout(()=>{
      window.location.reload();
      },2000)
  }
 }

}
useEffect(()=>{
checkboxx.current.checked=true
},[])



  return (
    <div className="font-sans text-xs font-medium flex  flex-col gap-3 ">


      <div className=" flex flex-col gap-2">
        <span className="text-gray-400 ">Username</span>
        <input ref={namee} type="text" className="pl-2 py-2 bg-gray-40 border-none   rounded text-xs text-gray-300 placeholder:text-xs placeholder:text-gray-500" placeholder="Enter your name" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-gray-400 ">Password</span>
        <input ref={passwordd} type="password" className="py-2 pl-2 bg-bl border-none bg-gray-40 text-vs text-gray-300 placeholder:text-xs placeholder:text-gray-500 rounded" placeholder="Enter your password" />
      </div>
      <div className="flex justify-between ">
        <div className="flex self-center">
          <input ref={checkboxx} className="self-center" type="checkbox" />
          <span className="self-center text-gray-300">Remember me</span>
        </div>

        
      </div>

      <button onClick={()=>{
       navigate();
      }} className="rounded border-none bg-blue-500 py-2 text-white text-xs font-medium">Login</button>
    </div>
  );
}

