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
        <div className=''>
            <div className="bg-[#3a451c] rounded-t-full">
                <h5 className="text-center text-2xl text-[#e5f2c4] border-b-2 border-[#e5f2c4] py-3">{totalTsbehState} </h5>
            </div>
            <div onClick={toggleCheck}>
                <img className="rounded-b-full w-[12rem]" onClick={incrementNumOfTsbeh} alt={'svtp-Checkbox'} src={checkbox} />
            </div>
        </div>

    )
}