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
        const url = "https://cookie-w-a.herokuapp.com/api/token/";
        const res = await axios.post(url, userInfo);
        console.log(res.data)
        setGlobalState({
            tokens: res.data,
            login,
            logout,
        })
        localStorage.setItem("tokens", res.data);
    }

    async function logout() {
        setGlobalState({
            tokens: null,
            login,
            logout,
        })
    
        localStorage.removeItem("tokens");
      }


    return (
        <AuthContext.Provider value={globalState}>
          {children}
        </AuthContext.Provider>
      );
}