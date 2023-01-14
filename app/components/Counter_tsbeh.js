import React, { useState } from "react";


export default function Counter_tsbeh() {
    let [numOfLikes, setNumOfLikes] = useState(0);
    const incrementNumOfLikes = () => {
        setNumOfLikes(numOfLikes+1)   
    }
    let [numOfLikes1, setNumOfLikes1] = useState(0);
    const incrementNumOfLikes1 = () => {
        setNumOfLikes1(numOfLikes1+1)   
    }
    let [numOfLikes2, setNumOfLikes2] = useState(0);
    const incrementNumOfLikes2 = () => {
        setNumOfLikes2(numOfLikes2+1)   
    }
    let [numOfLikes3, setNumOfLikes3] = useState(0);
    const incrementNumOfLikes3 = () => {
        setNumOfLikes3(numOfLikes3+1)   
    }
    let [numOfLikes4, setNumOfLikes4] = useState(0);
    const incrementNumOfLikes4 = () => {
        setNumOfLikes4(numOfLikes4+1)   
    }
    
    
    return(
        <section className="flex place-content-between ">
            <div class="w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
    
            <h5 class="mb-2 border text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{numOfLikes}</h5>
                   
                </div>
                    
                    <img class="rounded-t-lg"  src= '/assets/counter1.png' alt="" onClick={incrementNumOfLikes}/>
            

            </div>

            <div class="w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
    
            <h5 class="mb-2 border text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{numOfLikes1}</h5>
                   
                </div>
                    
                    <img class="rounded-t-lg"  src= '/assets/counter2.png' alt="" onClick={incrementNumOfLikes1}/>
            

            </div>
            <div class="w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
    
            <h5 class="mb-2 border text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{numOfLikes2}</h5>
                   
                </div>
                    
                    <img class="rounded-t-lg"  src= '/assets/counter3.png' alt="" onClick={incrementNumOfLikes2}/>
            

            </div>
            <div class="w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
    
            <h5 class="mb-2 border text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{numOfLikes3}</h5>
                   
                </div>
                    
                    <img class="rounded-t-lg"  src= '/assets/counter4.png' alt="" onClick={incrementNumOfLikes3}/>
            

            </div>            <div class="w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
    
            <h5 class="mb-2 border text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{numOfLikes4}</h5>
                   
                </div>
                    
                    <img class="rounded-t-lg"  src= '/assets/counter5.png' alt="" onClick={incrementNumOfLikes4}/>
            

            </div>
        </section>
    )
}