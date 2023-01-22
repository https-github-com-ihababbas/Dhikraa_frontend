import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2'
import styleTsbeh from '../styles/card_tsbeh.module.css'
import style from '../styles/modal.module.css'


export default function Home_Image_card({ img1, title1, img2, title2 }) {

    const [totalTsbehState, setTotalTsbehState] = useState(0);
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    }
    const incrementNumOfTsbeh = () => {
        if (totalTsbehState % 10 == 0 && totalTsbehState != 0) {
            popbox()
        }
        setTotalTsbehState(totalTsbehState + 1)
    }
    function popbox() {
        Swal.fire('اَللَّه يَجْزِيكَ اَلْخَيْرُ')
    }
    const checkbox = isChecked ? img1 : img2;

    return (
        // <div>
        //     <div onClick={toggleCheck}>
        //         <span><img alt={'svtp-Checkbox'} src={checkbox} /></span>
        //     </div>
        // </div>
        <div className={`${styleTsbeh.card}  w-48 bg-gray-200 border border-gray-800 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-200`}>
            <div className=" p-5">
                <h5 className="mb-2 border border-gray-800 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white dark:border-gray-200 dark:bg-gray-800">{totalTsbehState} </h5>
            </div>
            <div onClick={toggleCheck}>
                <img onClick={incrementNumOfTsbeh} alt={'svtp-Checkbox'} src={checkbox} />
            </div>
        </div>

    )
}