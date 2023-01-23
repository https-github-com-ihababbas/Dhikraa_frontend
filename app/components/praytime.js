import { useState } from 'react';
import styles from 'app/styles/styles.module.css';
import Image from 'next/image';
import home_img from 'public/assets/praypage.png'
import hadith from 'public/assets/hadith.png';
import moment from 'moment';
import { hadiths } from "./data/hadiths";
import Swal from 'sweetalert2';
import style from "../styles/quiz.module.css"
import image from "public/assets/image.png";
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
    <div>
      {/* <Image src={home_img} alt="Picture of the author" className={styles.image} /> */}
      <div className={style.wp_caption} >
        <Image
          src={image}
          alt="background"
          width={9999}
          height={300}
          className={style.demo} >

        </Image>
        <div className={style.wp_caption_text}>
          <h1 className="relative pb-2 text-5xl">مَوَاقِيت الصَّلَاةَ  </h1>
          <p className='pt-4 pb-2 text-2xl'>
            أَقِمِ ٱلصَّلَوٰةَ لِدُلُوكِ ٱلشَّمۡسِ إِلَىٰ غَسَقِ ٱلَّیۡلِ وَقُرۡءَانَ ٱلۡفَجۡرِۖ إِنَّ قُرۡءَانَ ٱلۡفَجۡرِ كَانَ مَشۡهُودࣰا
          </p>
          <p >سورة الإسراء: 78

          </p>



        </div>
      </div>



      <section className={`${styles.dashboard} ${style.back}`}>


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