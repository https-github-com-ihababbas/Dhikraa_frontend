"use client";
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const AuthContext = createContext();

export default function AuthWrapper({ children }) {
    const [globalState, setGlobalState] = useState(null)



    useEffect(() => {
        setGlobalState({
            tokens: localStorage.getItem("tokens"),
            login,
            logout,
            refresh,
            username: localStorage.getItem("username"),

        })

    }, [])



    async function login(userInfo) {
        const url = "https://dhiker-api-v1.herokuapp.com/api/token/";
        try {

            const res = await axios.post(url, userInfo);

            setGlobalState({
                tokens: res.data,
                login,
                logout,
                refresh,
                username: userInfo.username

            })

            localStorage.setItem("tokens", res.data);
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("username", userInfo.username);
        } catch {
            console.log("error")
        }



    }

    async function logout() {
        setGlobalState({
            tokens: null,
            login,
            logout,
            refresh,
            username: null,


        })

        localStorage.removeItem("tokens");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("is_superuser");
        localStorage.removeItem("userlocation");


    }

    async function refresh(refresh) {

        const url = "https://dhiker-api-v1.herokuapp.com/api/token/refresh";
        try {

            const res = await axios.post(url, { "refresh": refresh })
                .then((res) => {
                    localStorage.setItem("access", res.data.access);
                })
                .catch((err) => {
                    console.log(err);
                });


        } catch {
            console.log("error")
        }

    }


    return (
        <AuthContext.Provider value={globalState}>
            {children}
        </AuthContext.Provider>
    );
}