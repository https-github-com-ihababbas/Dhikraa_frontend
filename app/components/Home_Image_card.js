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
        <div className="w-1/3 px-10 py-20 ">
            <div>
                <h5>{totalTsbehState} </h5>
            </div>
            <div onClick={toggleCheck}>
                <img className="rounded-full" onClick={incrementNumOfTsbeh} alt={'svtp-Checkbox'} src={checkbox} />
            </div>
        </div>

    )
}