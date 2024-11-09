import { createContext } from "react";


export const AuthContext = createContext({
    
    isLoggedIn:false, //initally user not logged in
    login: ()=>{},
    logout: ()=>{}
})