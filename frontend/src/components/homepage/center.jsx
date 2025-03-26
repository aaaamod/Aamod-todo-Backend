
import {Outlet} from "react-router-dom";
import Header from "./header";
import { singninButton } from "../../stores/atoms/authAtoms";
import { useSetRecoilState } from "recoil";


export function Center(){
  return <div >
   <Header />
   <Outlet/>
  </div>
}




export default Center