
import {loginHead, signupHead } from "../../stores/atoms/authAtoms";
import {

 
  useRecoilValue,

} from "recoil";
import {BrowserRouter , Routes , Route} from "react-router-dom";
import { Login ,LoginDetail} from "./login";
import { SignupDetail , Signup } from "./signup";


export function Auth() {

  return (
    <div className="flex flex-col mt-40 bg-gray-20  md:w-2/6 sm:1/6 lg:3/6 self-center rounded-md  pb-4">
      <div className="flex pt-3 pb-3">
        
          <Login />
          <Signup />
    
      </div>
      <div className="m-4 bg-slae-400 ">
          <Check/>
        </div>
    </div>
  );

}




function Check(){
const Svalue=useRecoilValue(signupHead);
const Lvalue=useRecoilValue(loginHead);


if(Lvalue && !Svalue){

  return <LoginDetail/>
}
if(Svalue &&  !Lvalue){

  return <SignupDetail/>
}

}



export default Auth;
