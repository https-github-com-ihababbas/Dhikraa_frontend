"use client"

import React from "react";

import { useState, useContext, useEffect } from "react";



export default function answer(props){
    let value = 0
    value = Object.values(props.choices)
    //console.log(value)
    value.sort()
    //console.log(value)
    
    
    
    
    return(

        <>
         
           <p>
           <section clasName="w-[30%]">

            {value[0]} <input type="radio" name={props.id} value={value[0]} className="text-left" />
            </section>
            <section clasName="w-[30%]">

            {value[1]} <input type="radio" name={props.id} value={value[1]} className="text-left" />
            </section>  <section clasName="w-[30%]">

            {value[2]} <input type="radio" name={props.id} value={value[2]} className="text-left" />
            </section>  <section clasName="w-[30%]">

            {value[3]} <input type="radio" name={props.id} value={value[3]} className="text-left" />
            </section>
            </p>
         
        </>
    )
}