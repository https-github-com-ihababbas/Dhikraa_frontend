'use client';
import React from "react";


export default function aboutCardsView({ img, title }) {

 

    return (
        <div className="w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            
            <img className="rounded-t-lg" src={img} alt={title}  />
        </div>
    )
}