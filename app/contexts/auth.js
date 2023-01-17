"use client";
import { createContext, useState} from "react";
import axios from 'axios';
export const AuthContext = createContext();

export default function AuthWrapper({children}){

    
    const [globalState, setGlobalState] = useState({
        tokens: null,
        flagForm:true,
        login,
    })

    async function login (userInfo) {
        const url = "https://cookie-w-a.herokuapp.com/api/token/";
        const res = await axios.post(url, userInfo);
        console.log(res.data)
        setGlobalState({
            tokens: res.data,
            flagForm:false,
            login,
        })
    }

    return (
        <AuthContext.Provider value={globalState}>
          {children}
        </AuthContext.Provider>
      );
}