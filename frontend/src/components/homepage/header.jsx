
import { useNavigate } from "react-router-dom"
import Logo from "./svgs/logo"
import { loginHead, signupHead, singninButton } from "../../stores/atoms/authAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";



export function Header(){
  const signinbutton=useRecoilValue(singninButton);
  return <div className="bg-blue-200 shadow-black shadow-inner h-10 flex justify-between pl-7 pr-7 ">
    <div className="self-center flex justify-center  gap-1">
      <Logo />
    
      <div className="  self-center text-white font-sans">taskFlow</div>
      </div>
   {signinbutton?<Signin/>:<Logout/>}
  </div>
}

function Signin(){

     const loginSet=useSetRecoilState(loginHead);
     const signupSet=useSetRecoilState(signupHead)
  const navigate=useNavigate();



  return <>
  <button onClick={()=>{
   signupSet(false);
   loginSet(true);
    navigate("/auth");
  }} className="self-center font-sans bg-blue-200 text-white border-none shadow-[0px_0px_3px_rgba(255,255,255,0.25)] pl-2 pr-2 ">
   Sign in
 </button>
</>
}
function Logout(){
 
     const loginSet=useSetRecoilState(loginHead);
     const signupSet=useSetRecoilState(signupHead)
  const navigate=useNavigate();
  const signinbuttonCome=useSetRecoilState(singninButton)


  return <>
  <button onClick={()=>{
   signupSet(false);
   loginSet(true);
   signinbuttonCome(true)
    navigate("/auth");
    localStorage.removeItem("token");
  }} className="self-center font-sans bg-blue-200 text-white border-none shadow-[0px_0px_3px_rgba(255,255,255,0.25)] pl-2 pr-2 ">
   Log out
 </button>
</>

}
export default Header