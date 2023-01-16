import { useState } from 'react';
import styles from 'app/styles.module.css';
import Image from 'next/image';
import home_img from 'public/assets/praypage.png'
import hadith from '/home/student/401-01/final-project/frontend/Dhikraa_frontend/public/assets/hadith.png';
import moment from 'moment';
import {hadiths} from "./data/hadiths";
import Swal from 'sweetalert2';






export default function PrayTime() {
  const [language, setLanguage] = useState("ar"); // initial language state

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

    if (!city ) {
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
    if (!document.getElementById("city").value ) {
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
  
  <section className={styles.dashboard}>
    <Image src={home_img} alt="Picture of the author" className={styles.image}/>

    <div >
    <button onClick={handleClick}className={styles.button}>{language === "en" ? "Get Pray Times" : "الحصول على أوقات الصلاة"}</button>
      <input type="text" id="month" placeholder={language === "en" ? "Month" : "شهر"} className={styles.input} />
      <input type="text" id="year" placeholder={language === "en" ? "Year" : "عام"} className={styles.input}/>
      <input type="text" id="city" placeholder={language === "en" ? "City" : "مدينة"} className={styles.input}/>
      <input type="text" id="country" placeholder={language === "en" ? "Country" : "بلد"} className={styles.input}/>
      <button onClick={handleLanguageToggle}  className={styles.languageButton}>{language === "en" ? "Switch to Arabic" : "Switch to English"}</button>

      <div className={styles.div}>
      {showTable ? (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>{language === "en" ? "Date" : "تاريخ"}</th>
              <th className={styles.th}>{language === "en" ? "Imsak" : "إمساك"}</th>
              <th className={styles.th}>{language === "en" ? "Fajr" : "فجر"}</th>
              <th className={styles.th}>{language === "en" ? "Sunrise" : "شروق الشمس"}</th>
              <th className={styles.th}>{language === "en" ? "Dhuhr" : "ظهر"}</th>
              <th className={styles.th}>{language === "en" ? "Asr" : "عصر"}</th>
              <th className={styles.th}>{language === "en" ? "Maghrib" : "مغرب"}</th>
              <th className={styles.th}>{language === "en" ? "Isha" : "عشاء"}</th>
            </tr>
          </thead>
          <tbody>
          {timings ?timings.map((day, i) => {
            const currentDate = moment(day.date.readable, 'DD MMMM YYYY');
            const today = moment();
            const isCurrent = currentDate.isSame(today, 'day');
            
            
              return (
                <tr key={i} className={isCurrent ? styles.current : ""}>
                  <td className={styles.td}>{day.date.readable}</td>
                    <td className={styles.td}>{day.timings.Imsak}</td>
                    <td className={styles.td}>{day.timings.Fajr}</td>
                    <td className={styles.td}>{day.timings.Sunrise}</td>
                    <td className={styles.td}>{day.timings.Dhuhr}</td>
                    <td className={styles.td}>{day.timings.Asr}</td>
                    <td className={styles.td}>{day.timings.Maghrib}</td>
                    <td className={styles.td}>{day.timings.Isha}</td>
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
       <div>
        <h2 className={styles.h1}>{hadiths[currentIndex].hadith}</h2>
      </div>
      </div>
      <button onClick={handlePrev} className={styles.prev}>{language === "en" ?"Prev":"السابق"}</button>
      <button onClick={handleNext} className={styles.next}>{language === "en" ?"Next":"التالى"}</button>
      <div className={styles.cardImage}>
        <Image src={hadith} alt="Card 2 Image" />
      </div>
    </div>
  </div>
    </div>
  </section>
);
}