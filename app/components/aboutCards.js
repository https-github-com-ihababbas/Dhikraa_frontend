'use client';
import React from "react";
import { image } from './data/about_image'
import CardsView from "./aboutCardsView";
export default function aboutCards() {
return (
<>
<h2 className="m-3 text-2xl italic font-bold text-center text-green-900 dark:text-white" >قَنَواتُ التَّوَاصُل
</h2>
           
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