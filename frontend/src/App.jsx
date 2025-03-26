
import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useSearchParams } from "react-router-dom"
import Center from './components/homepage/center'
import Landing from "./components/landing page/landing"
import Auth from './components/authpage/auth'
import { SignupSuccess } from './components/authpage/signupsuccess'
import { LoginSuccess } from './components/authpage/loginsuccess'
import { Todo } from './components/todopage/update'
import { useSetRecoilState } from 'recoil'
import { singninButton } from './stores/atoms/authAtoms'
import { useEffect } from 'react'

function App() {
  return <div   className="bg-blue-200 h-screen pb-[2000px]">
   <BrowserRouter>
   <Routes>
    <Route  path="/" element={<Center/>}>
    <Route path='/' element={<Container><Landing/></Container>}/>
    <Route path='/auth' element={<Container><Auth/></Container>}/>
    <Route path='*' element={<Container><LoginSuCheck>
<Todo/>
</LoginSuCheck>
</Container>}/>
    <Route path='/SignupDone' element={<Container>
      <SignupSuccess/>
      </Container>}/>
    <Route path='/LoginDone' element={<Container>
      <LoginSuCheck><LoginSuccess/></LoginSuCheck>
      </Container>}/>
    <Route path='/Todo' element={<Container>
<LoginSuCheck>
<Todo/>
</LoginSuCheck>

    </Container>}/>
    </Route>
   </Routes>
   
   </BrowserRouter>

  </div>
}

function LoginSuCheck({children}){
  const signinB=useSetRecoilState(singninButton)
useEffect(()=>{
signinB(false);
},[])

  const user =localStorage.getItem("token");
return user?children:<Navigate to="../auth"/>
}

export function Container({children}){
  return <div className='text-white  bg-blck flex justify-center '>
  {children}
  </div>
}

export default App
