import { useState } from 'react';
import Reader from "./data/reader"
import Surah from "./data/surah"



export default function  Readerpage() {

    const callAPI = async () => {

        const response = await fetch('https://api.alquran.cloud/v1/surah/1/ar.alafasy');
        const data = await response.json();

        console.log(data.data);
        console.log(data.data.ayahs)
    }
        
    return (
        <div>
            <button onClick={callAPI}>Click</button>



        </div>
    )
}