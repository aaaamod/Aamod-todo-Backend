import { useEffect, useRef } from "react";
import {loginHead, signupHead} from "../../stores/atoms/authAtoms";
import {

  useRecoilState,
  useSetRecoilState,

} from "recoil";
import { useNavigate } from "react-router-dom";
import { SignupSuccess } from "./signupsuccess";






export function Signup() {

  const [singupValue, setSignupValue] = useRecoilState(signupHead);
  const setLoginValue = useSetRecoilState(loginHead);




  const borderColor = useRef();
  useEffect(() => {
  
    
    if (singupValue) {
  
      borderColor.current.classList.add("text-blue-500");
      borderColor.current.classList.add("border-b-blue-500");
      borderColor.current.classList.add("border-b-2");
      setLoginValue(false);
    } else  {
      borderColor.current.classList.remove("text-blue-500");
      borderColor.current.classList.remove("border-b-blue-500");
      borderColor.current.classList.remove("border-b-2");
    }
  }, [singupValue, setLoginValue]);

  return (
    <>
 
      <button
        ref={borderColor}
        onClick={() => {
          setSignupValue(true);
        }}
        className="text-gray-30 flex-1 border-x-0 border-y-0 bg-transparent font-sans text-sm font-medium pb-3"
      >
        Sign Up
      </button>
    </>
  );
}


export  function SignupDetail() {
  const nav=useNavigate();
  const namee=useRef();
  const emaill=useRef();
  const passwordd=useRef();

 async function navigatee(){
  const name=namee.current.value;
  const email=emaill.current.value;
  const password=passwordd.current.value;
if(name!="" && password!=""){
  const response=await fetch("https://todo-backendd.vercel.app/api/v1/user/signup",{
    method:"POST",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      email,
      password
    })
  })


  const data=await response.json();
 if(data.msg=="db error"){
  let parsedError=JSON.parse(data.err);

  if(parsedError[0].path[0]=="email"){
    emaill.current.value="";
    emaill.current.placeholder="Enter valid mail";
    emaill.current.focus();
    emaill.current.classList.add("placeholder:text-orange-400")
  }
else if(parsedError[0].path[0]=="password"){
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
 else if(response.status!=500){
   
    nav("../SignupDone")}
   else if(data.msg=="Too many request"){
      alert("Too many request , tryagain after sometime")
      setTimeout(()=>{
        window.location.reload();
        },2000)
    }

}
 

    
  }

  return (
    <div className="font-sans text-xs font-medium flex flex-col gap-3 ">


      <div className=" flex flex-col gap-2">
        <span className="text-gray-400 ">Username</span>
        <input ref={namee} type="text" className="pl-2 py-2 bg-gray-40 border-none   rounded text-xs text-gray-300 placeholder:text-xs placeholder:text-gray-500" placeholder="Enter your name" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-gray-400 ">Email</span>
        <input ref={emaill} type="text" className="py-2 pl-2 bg-bl border-none bg-gray-40 text-vs text-gray-300 placeholder:text-xs placeholder:text-gray-500 rounded" placeholder="Enter your Email" />
      </div>

      <div className="flex flex-col gap-2 pb-4">
        <span className="text-gray-400 ">Password</span>
        <input ref={passwordd} type="password" className="py-2 pl-2 bg-bl border-none bg-gray-40 text-vs text-gray-300 placeholder:text-xs placeholder:text-gray-500 rounded" placeholder="Enter your password" />
      </div>

     

      <button onClick={()=>{
        navigatee();

      }} className="rounded border-none bg-blue-500 py-2 text-white text-xs font-medium">Sign Up</button>
    </div>
  );
}
