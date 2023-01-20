"use client";
import React from "react";
import { useContext} from "react";
import { AuthContext } from "../contexts/auth";



export default function AdminPanel(){
  const { tokens, refresh } = useContext(AuthContext);
  const refresh_string = localStorage.getItem("refresh");
  refresh(refresh_string);
  const access = localStorage.getItem("access");
  const config = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  const admin =localStorage.getItem("is_superuser")

  console.log(typeof(admin))
    return (
        <>
        {admin=='true' && <h1>test admin panel </h1>}
        
        </>
    )
}