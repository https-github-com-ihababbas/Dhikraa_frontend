"use client";
import { createContext, useState} from "react";
import axios from 'axios';
export const AuthContext = createContext();

export default function AuthWrapper({children}){

    
    const [globalState, setGlobalState] = useState({
        tokens: localStorage.getItem("tokens"),
        login,
        logout,
        
    })

    async function login (userInfo) {
        const url = "https://dhiker-api-v1.herokuapp.com/api/token/";
        try{

            const res = await axios.post(url, userInfo);
            console.log(2,res.data)
            setGlobalState({
                tokens : res.data,
                login,
                logout,
                
            })
            console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",res.data)
            localStorage.setItem("tokens", res.data);
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("username", userInfo.username);
        }catch {
            console.log("error")
        }
        
        
        
    }

    async function logout() {
        setGlobalState({
            tokens: null,
            login,
            logout,
           
        })
    
        localStorage.removeItem("tokens");
        localStorage.removeItem("access");
        localStorage.removeItem("username");
      }


    return (
        <AuthContext.Provider value={globalState}>
          {children}
        </AuthContext.Provider>
      );
}