import React, { useState } from "react";
import Home_Image_card from './Home_Image_card'
import { image } from './data/Counter_Image'
import styleSection from '../styles/formAndTsbeh.module.css'

export default function Counter_tsbeh() {



    return (
        <>
            <section className={`${styleSection.section1}`}>
                {image.map((element) => (
                    <Home_Image_card

                        title={element.title}
                        img={element.image_url}
                    // incrementtotal = {incrementtotal}

                    />
                ))}
            </section>
        </>
    )

}