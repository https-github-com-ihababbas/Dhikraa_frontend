"use client";
import { createContext, useState} from "react";
import axios from 'axios';
export const AuthContext = createContext();

export default function AuthWrapper({children}){

    
    const [globalState, setGlobalState] = useState({
        tokens: localStorage.getItem("tokens"),
        login,
        logout,
        refresh,
        
    })

    async function login (userInfo) {
        const url = "https://dhiker-api-v1.herokuapp.com/api/token/";
        try{

            const res = await axios.post(url, userInfo);

            setGlobalState({
                tokens : res.data,
                login,
                logout,
                refresh,
                
            })

            localStorage.setItem("tokens", res.data);
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
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
            refresh,
           
        })
    
        localStorage.removeItem("tokens");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

      }

      async function refresh (refresh) {

        const url = "https://dhiker-api-v1.herokuapp.com/api/token/refresh";
        try{

            const res = await axios.post(url, {"refresh":refresh});

            localStorage.setItem("access", res.data.access);
           
        }catch {
            console.log("error")
        }
          
    }
    

    return (
        <AuthContext.Provider value={globalState}>
          {children}
        </AuthContext.Provider>
      );
}