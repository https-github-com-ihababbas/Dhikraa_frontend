import React, { useState } from "react";
import Home_Image_card from './Home_Image_card'
import {image} from './data/Counter_Image'
import style from '../styles/card_tsbeh.module.css'

export default function Counter_tsbeh() {
    
    
    
    return (
        <>
        <section className={`flex space-x-1 place-content-center bg-white ${style.container}`}>
        { image.map((element) => (
            <Home_Image_card
            
                title = {element.title}
                img = {element.image_url}
                // incrementtotal = {incrementtotal}

             />
        ))}
        </section>
    </>
    )
    
}