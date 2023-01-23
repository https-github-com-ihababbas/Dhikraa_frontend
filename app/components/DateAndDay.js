import React from "react";
import { useState } from "react";
import axios from "axios";
import style from '../styles/DateAndDay.module.css'


export default function DateAndDay() {
    

    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var dateTimeString = + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    


    const [prayaddressState, SetPrayaddressState] = useState({})
    const [prayClearaddressState, SetPrayClearaddressState] = useState({})


    
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate()

    async function timeAndAdress() {
        'this function give an opject of pray times from api'
        const [dataTime, setDataTime] = useState('')

        let objDate = {
            year,
            month
        }

        // note: change address when we complet backend

        const url = 'https://api.aladhan.com/v1/calendarByAddress?address=ِAmman'
        await axios.get(url, objDate)
            // const dataTime = res.data.data
            .then((res) => {
                setDataTime(res.data.data);
            })
            .catch((err) => {
                const x= err;
            });
        {
            dataTime != '' && dataTime.map(item => {
                if (item.date.gregorian.day == day) {
                    SetPrayaddressState({
                        gregorian: item.date.gregorian.date,
                        hijri: item.date.hijri.date,
                        dayName: item.date.hijri.weekday.ar,
                        timezone: item.meta.timezone,
                    })
                    try {
                        SetPrayClearaddressState({

                            timezone: prayaddressState.timezone.split("/")[1]
                        })
                    }
                    catch (err) {

                    }
                }

            })
        }
    }
    timeAndAdress()
    return (
        <>
            <section className="rounded-t-md text-2xl text-[#252f0b] bg-[#949e7b] mx-32 px-16 mt-14 ">
                <div className="text-4xl pt-7 pb-2 text-center border-b-2">
                    {dateTimeString}
                </div>
                <section className=" flex justify-between py-3 text-center">
                    <h1 className="w-full py-1">التاريخ : <span className="text-base">{prayaddressState.gregorian}</span></h1>
                    <h1 className="w-full py-1">التاريخ الهجري : <span className="text-base">{prayaddressState.hijri}</span></h1>
                    <h1 className="w-full py-1">اليوم : <span className="text-xl">{prayaddressState.dayName}</span></h1>
                    <h1 className="w-full py-1"><span className="text-lg">{prayClearaddressState.timezone} </span>: المكان</h1>
                </section>
            </section>
        </>
    )
}