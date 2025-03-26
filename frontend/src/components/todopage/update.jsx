import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addtodoo,  todoDone, todoIds, update } from "../../stores/atoms/todoatoms";
import {  useEffect, useRef } from "react";
import { singninButton } from "../../stores/atoms/authAtoms";
import clsx from "clsx"
import { useNavigate } from "react-router-dom";
import axios from "axios";




export function Todo() {

    return <div className=" w-full m-7 bg-slat-400">
    <div className="flex flex-col gap-8 bg-yellw-200 ">
  <RecoilRoot>
  <TodoHead/>
  <TodoList/>
  </RecoilRoot>
    </div>
  </div>
  
}


 function TodoHead(){

 const [ids,todoIdList]=useRecoilState(todoIds)

 const valuee=useRef();
 const newId=Date.now();
 const addTodo=useSetRecoilState(addtodoo(newId));
 const sett=useSetRecoilState(addtodoo(ids[ids.length]));
const nav=useNavigate();
  
async  function add(){
    const titlee=valuee.current.value;

    if(titlee!=""){
      todoIdList((listt)=>{
        return [...listt , newId]
      });
      
      addTodo({
        id:newId,
        title:titlee,
        completed:false,
        todoId:null
      }) 
      
      
      
      
      valuee.current.value=""; 
      const response=await fetch("https://todo-backendd.vercel.app/api/v1/todo/create",{
        method:"POST",
        headers:{
          "content-Type":"application/json",
          "authorization":localStorage.getItem("token")
        },
        body:JSON.stringify({
          title:titlee,
          isComplted:false
        })
      })
    
    const data=await response.json()
    addTodo((prev)=>({
      ...prev, todoId:data.todoId
    }))

   
   if(response.status==500 || response.status==401 || data.message=="user not found"){
     localStorage.removeItem("token");
    nav("../auth")
   }
   if(data.msg=="Too many request"){
    alert("Too many request , tryagain after sometime")
    setTimeout(()=>{
      window.location.reload();
      },2000)
  }
  

  
}
  }

  return <div   className="flex p-3 h-14 gap-2 rounded flex-col bg-gray-20">
  <div className="bg-orane-300 flex">
    <input ref={valuee} onKeyDown={(event)=>{
     if(event.key=="Enter"){
      add();
     }
    }} className="flex-1 p-2 text-vs text-gray-300 placeholder:text-vs placeholder:text-gray-300 bg-gray-500 rounded border-none " type="text" placeholder="Add a new task..." />
  </div>
 <div className="flex justify-end">
 <div>
    <button onClick={add} className="cursor-pointer bg-blue-500 text-vs px- py-1 font-bold  rounded border-none text-white">+ Add Task</button>
    </div>
    </div>
  </div>
}










function TodoList(){


  let nav=useNavigate();
  let i=useRef(0);
  const responsee=useRef();
     let newId=Date.now();
     const [todoList,todoIdList]=useRecoilState(todoIds);
     const addTodo=useSetRecoilState(addtodoo(newId));

 useEffect(()=>{

async function fetchFromDb(){
if(i.current==0){
  let ress
 ress=await fetch("https://todo-backendd.vercel.app/api/v1/user/me",{
    method:"GET",
    headers:{
      "content-Type":"application/json",
      "authorization":localStorage.getItem("token")
    }
  })
 responsee.current=await ress.json();
 if(responsee.current.msg=="Too many request"){
  alert("Too many request , tryagain after sometime")
  setTimeout(()=>{
    window.location.reload();
    },60000)
}
 if(responsee.current.err=="invalid signature"){nav("../auth");return;}
}
else return
}


function fetchFromDbMain(){
  return new Promise ((resolve)=>{
   resolve(fetchFromDb(i.current))
  })
}
  



fetchFromDbMain().then(()=>{
if(i.current<responsee.current.todo.length)
  {  

    addTodo({
      id:newId,
      title:responsee.current.todo[i.current].title,
      completed:responsee.current.todo[i.current].isComplete,
      todoId:responsee.current.todo[i.current]._id
    })
    
todoIdList((listt)=>{
  return [...listt , newId]
});}else return;
})


 },[i.current])



  return <div    className="flex h-screen gap-7 flex-col">
     {todoList.map((idd)=>{
      
      return <Todos  key={idd}  id={idd}/>
     })}
  </div>
}














function Todos({id }){
  const todoRef=useRef();
  const todo=useRecoilValue(addtodoo(id))
  const [updateState ,updateStatee]=useRecoilState(update(id));
  return   <div  ref={todoRef} className=" flex gap-3 flex-col g-red-200 px-3 py-3 border-gray-500 border-solid border ">
  <TodoInfo  id={id}/> 
 
  <div className="flex justify-end border-soid">
    <div className="flex gap-5 justify-center">
     {todo.completed?null:updateState ? <Update  id={id} />:null}
      <Delete reference={todoRef}   id={id} />
     </div>
  </div>
  </div>
}












function TodoInfo({id}){

  const [todo ,seTodo]=useRecoilState(addtodoo(id))
  let radioB=useRef();
  useEffect(()=>{
  if(todo.completed==true)radioB.current.checked=true
  else radioB.current.checked=false
  },[])
  const [updateState, setting]=useRecoilState(update(id));
  const donee=useSetRecoilState(todoDone(id))
  const titileB=useRef();
 
  async function saving(){
    const response=await fetch(`https://todo-backendd.vercel.app/api/v1/todo/update/${todo.todoId}`,{
      method:"PUT",
      headers:{
        "content-Type":"application/json",
        "authorization":localStorage.getItem("token")
      },
      body:JSON.stringify({
        isComplete:true
      })
    })
  const data=await response.json();
 
  if(data.msg=="Too many request"){
    alert("Too many request , tryagain after sometime")
    setTimeout(()=>{
      window.location.reload();
      },2000)
  }
  }



 function focuss(){
 setting(false)
 }

  return    <div className="gap-2 bg-orage-400 h-8 flex border-x-0 border-solid border-t-0 border-b-2 border-gray-500">
   <input onClick={()=>{
   titileB.current.classList.add("line-through")
   titileB.current.classList.add("text-yellow-300")
   seTodo((p)=>({...p, completed:true}))
   saving();
  }} type="radio" ref={radioB}  className={clsx(" h-4 w-4 border-none"
  )}  name="" id="" />
  {updateState ?  <div ref={titileB} onClick={focuss} className={clsx(" text-white font-medium flex-1 font-sans text-sm ", todo.completed? "line-through text-yellow-300": null)}>
     {todo.title}
   </div>  :<UpdateInput id={id}/>}
 </div>
}

















function UpdateInput({id}){

  const [todoo ,todo]=useRecoilState(addtodoo(id))
  const updateState=useSetRecoilState(update(id))
  const reference=useRef();


useEffect(()=>{
  reference.current.focus();
},[]);



async function saving(){
  const response=await fetch(`https://todo-backendd.vercel.app/api/v1/todo/update/${todoo.todoId}`,{
    method:"PUT",
    headers:{
      "content-Type":"application/json",
      "authorization":localStorage.getItem("token")
    },
    body:JSON.stringify({
      title:reference.current.value,
      isComplted:todoo.isComplte
    })
  })
const data=await response.json();
if(data.msg=="Too many request"){
  alert("Too many request , tryagain after sometime")
  setTimeout(()=>{
    window.location.reload();
    },2000)
}
}

function check(){
  if(reference.current.value!=""){
    reference.current.blur()
    return true
  }
  else return false
}



  return <div className="flex flex-1 h-6  ">
    <input onBlur={()=>{
      updateState(true)
    }}  ref={reference}  onKeyDown={ (event)=>{
    if(event.key=="Enter"){
      if(check()){
        todo((prev)=>({
          ...prev , title:reference.current.value
        }))

        updateState(true)
        saving();
      }
    }
    }} className="text-white  flex flex-1 placeholder-gray-400  rounded bg-transparent border-none p-0 focus:placeholder-transparent
    placeholder:text-vs 
    focus:outline-0  focus:text-vs" type="text" placeholder="Update todo...."/>
  </div>
}









function Update({id}){
  const updateState=useSetRecoilState(update(id))
  
function updatee(id){
  updateState(false);
}

  return <div className="w-5 h-5">{<div onClick={(id)=>{
    updatee(id)
  }} className="cursor-pointer self-center">
 <img className="w-5 h-5 bg-trasparent" src="https://img.icons8.com/?size=100&id=49&format=png&color=8E95A1"  />
  </div>}</div>
}






function Delete({reference , id }){
  const todo=useRecoilValue(addtodoo(id))

async  function deleting(){
   reference.current.remove();
   const response=await fetch(`https://todo-backendd.vercel.app/api/v1/todo/delete/${todo.todoId}`,{
    method:"DELETE",
    headers:{
      "content-Type":"application/json",
      "authorization":localStorage.getItem("token")
    }
  })
  const data=await response.json();
   if(data.msg=="Too many request"){alert("Too many request try again after sometime")
    setTimeout(()=>{
  window.location.reload();
  },2000)
   }

  }

  return <div>{<div onClick={deleting} className="cursor-pointer self-center">
    <img className="w-5 h-5 bg-trasparent"  src="https://img.icons8.com/?size=100&id=67884&format=png&color=8E95A1"  />
  </div>}</div>
}






