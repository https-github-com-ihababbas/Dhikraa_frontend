import React from "react";
import Home_Image_card from './Home_Image_card'
import Image from "next/image";
import { image } from './data/Counter_Image'
import styleTsbeh from '../styles/card_tsbeh.module.css'
import img from "public/assets/tsbeh_bg.png";
import line_img from "public/assets/line.png";

export default function Counter_tsbeh() {

    return (
        <section className="relative mb-32 ">
            <section className='absolute mx-64'>
                <div className="text-5xl text-center justify-self-center text-center text-[#252f0b] mx-64 my-12 pb-3">
                    <h5> خاتم التسبيح </h5>
                    <Image className="" src={line_img} />
                </div>
                <section className='flex justify-between gap-20'>
                    {image.map((element, index) => (
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
            <div
                style={{
                    position: 'relative',
                    height: '60vh',
                    width: '100%',
                    clipPath: 'inset(0 0 0 0)',
                    zIndex: -99,
                }}
            >
                <div
                    style={{
                        position: 'fixed',
                        height: '100%',
                        width: '100%',
                        left: '0',
                        top: '0',
                        filter: 'brightness(0.5) invert(.3)',
                    }}
                >
                    <Image
                        src={img}
                        layout="fill"
                        objectFit="cover"
                        sizes="100vw"

                    ></Image>
                </div>
            </div>

        </section>
    )

}