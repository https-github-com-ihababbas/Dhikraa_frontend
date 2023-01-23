import { useState } from 'react';
import styles from 'app/styles/styles.module.css';
import Image from 'next/image';
import home_img from 'public/assets/praypage.png'
import hadith from 'public/assets/hadith.png';
import moment from 'moment';
import { hadiths } from "./data/hadiths";
import Swal from 'sweetalert2';
import style from "../styles/quiz.module.css"
import maca from "public/assets/maca.jpg";
import { Icon } from '@iconify/react';





export default function PrayTime() {
  const [language, setLanguage] = useState("ar"); // initial language state
  const [prayTimeState, SetPrayTimeState] = useState({})


  // toggle the language
  const handleLanguageToggle = () => {
    if (language === "en") {
      setLanguage("ar");
    } else {
      setLanguage("en");
    }
  };
  const callAPI = async () => {
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;


    if (!city) {
      Swal.fire("Please enter the city ")
      return;
    }

    try {
      const res = await fetch(`https://api.aladhan.com/v1/calendarByCity?city=${city}&country={country}&method=2&month=${month}&year=${year}`);
      const data = await res.json();

      setTimings(data.data);
    } catch (err) {
      console.log(err);
    }
  };



  const [currentDate, setCurrentDate] = useState(new Date());


  const [timings, setTimings] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    if (!document.getElementById("city").value) {
      Swal.fire(language === "en" ? "Please enter the city " : "يرجى إدخال المدينة")
      return;
    }
    callAPI();
    setShowTable(true);
  }
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === hadiths.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(hadiths.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };


  return (
    <div className={style.back}>
      {/* <Image src={home_img} alt="Picture of the author" className={styles.image} /> */}
      
      <section className="pt-6 ">
        <h1 className="text-5xl font-bold text-center">
        ❆  مَوَاقِيت اَلصَّلَاةِ  ❆
        </h1>

        <div className="flex justify-between h-full py-4 mb-8 ml-40 mr-40 rounded-md shadow-sm flex-right">

          <div className="relative justify-center w-1/4 h-64 ">
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#949e7b] to-[#778554] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div className="relative shadow-lg sm:rounded-3xl sm:p-1 ">
              <Image className="w-full h-64 rounded-3xl rad" src={maca} />
            </div>
          </div>
          <div className="w-3/4">
            <h1 className="mt-10 text-4xl justify-self-center text-right text-[#252f0b] dark:text-white" ></h1>
            <br />
            
           
              
            <h3 className="text-2xl text-[#252f0b]  text-right ml-32 mr-32 flex justify-between">
   - أَقِمِ ٱلصَّلَوٰةَ لِدُلُوكِ ٱلشَّمۡسِ إِلَىٰ غَسَقِ ٱلَّیۡلِ وَقُرۡءَانَ ٱلۡفَجۡرِۖ إِنَّ قُرۡءَانَ ٱلۡفَجۡرِ كَانَ مَشۡهُودࣰا - سورة الاسراء : 78  
              <Icon icon="iconoir:system-restart" className="mx-4" />

            </h3>
            <h3 className="text-2xl text-[#252f0b]  text-right ml-32 mr-32 flex justify-between">
          103 : فَإِذَا قَضَيْتُمُ الصَّلَاةَ فَاذْكُرُوا اللَّهَ قِيَامًا وَقُعُودًا وَعَلَى جُنُوبِكُمْ فَإِذَا اطْمَأْنَنْتُمْ فَأَقِيمُوا الصَّلَاةَ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا - سورة النساء              <Icon icon="iconoir:system-restart" className="mx-4" />

            </h3>

        </div>
    </div>
       </section>




      <section className={`${styles.dashboard} `}>


        <div  >
          <div className='flex justify-center'>

            <input type="text" id="month" placeholder={language === "en" ? "Month" : "شهر"} className={styles.input} />
            <input type="text" id="year" placeholder={language === "en" ? "Year" : "عام"} className={styles.input} />
            <input type="text" id="city" placeholder={language === "en" ? "City" : "مدينة"} className={styles.input} />
            <input type="text" id="country" placeholder={language === "en" ? "Country" : "بلد"} className={styles.input} />
            <button onClick={handleClick} className=" ml-4 h-[2.8rem] mt-[20px] mr-14 py-1.6 px-2 flex text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

              <div className="px-2 pt-1.5 font-mono text-xl font-bold">
                {language === "en" ? "Get Pray Times" : "الحصول على أوقات الصلاة"}
              </div>
              <span className="px-2 py-[1.4rem] font-mono text-3xl text-gray-100 border-l-2 border-gray-100">
              </span>
            </button>
          </div>
          {/* <button onClick={handleClick} className={styles.button}>{language === "en" ? "Get Pray Times" : "الحصول على أوقات الصلاة"}</button> */}
          {/* <button onClick={handleLanguageToggle}  className={styles.languageButton}>{language === "en" ? "Switch to Arabic" : "Switch to English"}</button> */}

          <div className={styles.div}>
            {showTable ? (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.th}>{language === "en" ? "Isha" : "عشاء"}</th>
                    <th className={styles.th}>{language === "en" ? "Maghrib" : "مغرب"}</th>
                    <th className={styles.th}>{language === "en" ? "Asr" : "عصر"}</th>
                    <th className={styles.th}>{language === "en" ? "Dhuhr" : "ظهر"}</th>
                    <th className={styles.th}>{language === "en" ? "Sunrise" : "شروق الشمس"}</th>
                    <th className={styles.th}>{language === "en" ? "Fajr" : "فجر"}</th>
                    <th className={styles.th}>{language === "en" ? "Imsak" : "إمساك"}</th>
                    <th className={styles.th}>{language === "en" ? "Date" : "تاريخ"}</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {timings ? timings.map((day, i) => {
                    const currentDate = moment(day.date.readable, 'DD MMMM YYYY');
                    const today = moment();
                    const isCurrent = currentDate.isSame(today, 'day');



                    return (
                      <tr key={i} className={`${isCurrent ? styles.currents : ""} ${styles.trscroll}`}>
                        <td className={styles.td}>{day.timings.Isha.replace(" (+03)", "")}</td>
                        <td className={styles.td}>{day.timings.Maghrib.replace(" (+03)", "")}</td>
                        <td className={styles.td}>{day.timings.Asr.replace(" (+03)", "")}</td>
                        <td className={styles.td}>{day.timings.Dhuhr.replace(" (+03)", "")}</td>
                        <td className={styles.td}>{day.timings.Sunrise.replace(" (+03)", "")}</td>
                        <td className={styles.td}>{day.timings.Fajr.replace(" (+03)", "")}</td>
                        <td className={styles.td}>{day.timings.Imsak.replace(" (+03)", "")}</td>
                        <td className={styles.td}>{day.date.readable}</td>
                      </tr>

                    );
                  }) : null}


                </tbody>
              </table>
            ) : null}
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.cardText}>
              <button onClick={handleNext} className={styles.next}> 
             
              <Icon icon="material-symbols:arrow-back-rounded" />
              </button>
                <div>
               
                  <h2 className={styles.h1}>{hadiths[currentIndex].hadith}</h2>
                </div>
              </div>
              <button onClick={handlePrev} className={styles.prev}>
              <Icon icon="material-symbols:arrow-forward-rounded" />

              </button>
              <div className={styles.cardImage}>
                <Image src={hadith} alt="Card 2 Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}