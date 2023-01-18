'use client';
import React from "react";
import { image } from './data/about_image'
import CardsView from "./aboutCardsView";
export default function aboutCards() {
return (
<>
<h2 className="m-3 text-2xl italic font-bold text-center text-black dark:text-white" >Our Communication</h2>
           
<div class="flex justify-center">
            {image.map((element) => (
            <CardsView

                        title={element.title}
                        img={element.image_url}
                    

                    />
                ))}
  </div>
</>

)


}