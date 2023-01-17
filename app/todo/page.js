"use client";
import React from "react";
import {useContext} from 'react'
import { AuthContext } from "../contexts/auth";

export default function Todo() {
    const { tokens } = useContext(AuthContext);
  return (
    <>
    {tokens ?<h1 className="text-black">welcome</h1>: <h1 className="text-black">You dont have access for this feature</h1>}
    </>
  );
}
