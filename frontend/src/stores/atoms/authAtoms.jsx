import { atom } from "recoil";

export const loginHead=atom({
  key:"loginHead",
  default:false
});
export const signupHead=atom({
  key:"signupHead",
  default:true
});


export const signinG=atom({
  key:"signinG",
  default:true
})
export const singninButton=atom({
  key:"signinbutton",
  default:true
})

export const logindone=atom({
  key:"logindone",
  default:false
})
export const signupdone=atom({
  key:"signupdone",
  default:true
})