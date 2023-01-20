import React from "react";
import Home_Image_card from './Home_Image_card'
import { image } from './data/Counter_Image'
import styleSection from '../styles/formAndTsbeh.module.css'
import styleTsbeh from '../styles/card_tsbeh.module.css'
export default function Counter_tsbeh() {



    return (
        <>
            <section className={`${styleSection.section1} `}>
                <section className={styleTsbeh.grid_container}>
                    {image.map((element,index) => (
                        <Home_Image_card
                            key={index}
                            title={element.title}
                            img={element.image_url}
                        // incrementtotal = {incrementtotal}

                        />
                    ))}
                </section>
            </section>
        </>
    )

}