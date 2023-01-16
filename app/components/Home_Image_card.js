import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2'
import styleTsbeh from '../styles/card_tsbeh.module.css'

export default function Home_Image_card({ img, title }) {

    const [totalTsbehState, setTotalTsbehState] = useState(0);

    const incrementNumOfTsbeh = () => {
        if (totalTsbehState % 10 == 0 && totalTsbehState != 0) {
            popbox()
        }
        setTotalTsbehState(totalTsbehState + 1)
    }
    function popbox() {
        Swal.fire('اَللَّه يَجْزِيكَ اَلْخَيْرُ')
    }

    return (
        <>
            <div className={`${styleTsbeh.card} w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700`}>
                <div className="p-5">
                    <h5 className="mb-2 border text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{totalTsbehState}</h5>
                </div>
                <img className="rounded-t-lg" src={img} alt={title} onClick={incrementNumOfTsbeh} />
            </div>

        </>
    )
}