import { atom, atomFamily } from "recoil";




export const addtodoo=atomFamily({
  key:"addtask",
  default: (id)=>({
    id,
    title:"",
    completed:false,
    todoId:null
  })
})

export const update=atomFamily({
  key:"updatetask",
  default: (id)=>({
    id:id,
    updated:true
  })
})

export const todoDone=atomFamily({
  key:"tododone",
  default: (id)=>({
    id,
    done:false
  })
})

export const todoIds=atom({
  key:"IdList",
  default:[]
})












