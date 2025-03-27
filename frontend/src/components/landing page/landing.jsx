
import { useNavigate} from "react-router-dom";

 export function Landing(){
  const nav=useNavigate();


  return  <div className=" flex flex-col gap-3 mt-40 bg-gra-700">
  <span className="sm:text-5xl text-3xl self-center text-white font-sans font-bold">Simplify Your Daily Tasks</span>
   <span className="m-5 text-gray-400 self-center text-center font-sans pt-5">Focus on what matters most , the minimalist task manager designed fro everyday productivity. </span>
   <div onClick={()=>{
     nav("/auth")
   }} className="self-center pt-11"><button className="border-none rounded text-white font-sans font-medium bg-orange-500 pt-3 pb-3 pl-5 pr-5">Get Started Free</button></div>
   </div>
}

export default Landing;
