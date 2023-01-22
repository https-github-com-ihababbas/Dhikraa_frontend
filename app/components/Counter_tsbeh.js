import React, { useState } from "react";
import Home_Image_card from './Home_Image_card'
import { image } from './data/Counter_Image'
import styleTsbeh from '../styles/card_tsbeh.module.css'
export default function Counter_tsbeh() {

    


    return (
        <section className={`${styleTsbeh.section_container} shadow-xl`}>
            
            <h1 className="m-3 text-2xl italic font-bold text-center text-teal-600">خاتم التسابيح</h1>
            <section className={styleTsbeh.grid_container}>
                    {image.map((element,index) => (
                        <Home_Image_card
                            key={index}
                            title1={element[0].title}
                            img1={element[0].image_url}
                            title2={element[1].title}
                            img2={element[1].image_url}
                        

                        />
                    ))}
                </section>
        </section>
    )

}