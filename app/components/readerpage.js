import { useState, useEffect, useRef } from "react";
import {Reader} from "./data/reader"
import { Surah } from "./data/surah"
import styles from 'app/styles/reader.module.css';
import reader_image from 'public/assets/reader.png';
import Image from 'next/image';
import Readervideos from "./readervidos";
import { Container } from "postcss";


export default function Readerpage() {
    const [surahNumber, setSurahNumber] = useState(1);
    const [readerCode, setReaderCode] = useState("ar.alafasy");
    const [ayahs, setAyahs] = useState([]);
    const [jumpAyah, setJumpAyah] = useState(null);    
    const [currentAyah, setCurrentAyah] = useState(0);
    const audioRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [surahName, setSurahName] = useState(null);


    
    const callAPI = async () => {
        try {
          const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${readerCode}`);
          const data = await response.json();
          console.log(data);
          setSurahName(data.data.name);
          if(data.data.ayahs && data.data.ayahs.length > 0 ){
            setAyahs(data.data.ayahs);
          }
          setCurrentAyah(0);
        } catch (error) {
          console.log('Failed to fetch data: ', error);
          // show an error message to the user
        }
      };

    const playNextAyah = () => {
      if (currentAyah < ayahs.length - 1) {
        setCurrentAyah(currentAyah + 1);
      }
    };

    // In the componentDidMount lifecycle method 

    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.play();
          return () => {
            if (audioRef.current) {
              audioRef.current.pause();
            }
          }
        }
      }, [audioRef, currentAyah]);

    const jumpToAyah = (ayahNumber) => {
      // Make sure the ayah number is within the valid range
      if (ayahNumber >= 0 && ayahNumber < ayahs.length) {
          setCurrentAyah(ayahNumber);
      }
  };
  const handleJump = (e) => {
    e.preventDefault();
    setJumpAyah(parseInt(e.target.jump.value));
};
const handleChange = (e) => {
    setSurahNumber(e.target.value);
    callAPI();
    
};


    return (
      <div>
        
         <Image src={reader_image} alt="Picture of the author" className={styles.image}/>
        <div className="border-black">
            <h1 className="mp3">MP3 audio</h1>

         <div className={styles.selectWrapper}>
                    <select onChange={handleChange} className={styles.selectsurah}>
                    {Surah.map(surah => (
                    <option key={surah.number} value={surah.number}> Surah {surah.number} - {surah.name}
            </option>
            
                )
            )}
        </select>
        <select onChange={(e) => setReaderCode(e.target.value)} className={styles.selectreader}>
        {Reader.map(reader => (
                    <option key={reader.code} value={reader.code} className={styles.option}>{reader.name}
            </option>
                )
            )}
        </select>

</div>
            <div className={styles.selectWrapper}>
        <button onClick={() => {
    callAPI();
    
    setShowForm(true);
}} className={styles.button}>ابدأ السورة</button>
 {ayahs.length > 0 && (
    <div className={styles.audioContainer}>
  <audio ref={audioRef} src={ayahs[currentAyah].audio} controls onEnded={playNextAyah} className={styles.audio}/>
  <div className={styles.textContainer}>
    <p className={styles.ayahText}>{ayahs[currentAyah].text}</p>
  </div>
</div>
        )}


{showForm && (
    <div className={styles.selectWrapper}>
        <button onClick={() => jumpToAyah(currentAyah - 1)} disabled={currentAyah === 0} className={styles.button}>السابق</button>
        <form onSubmit={(e) => {
    e.preventDefault();
    jumpToAyah(e.target.jump.value - 1);
}}>

  <input type="number" name="jump" min={1} max={ayahs.length} className={styles.input}/>
  <button type="submit" 
          onClick={(e) => jumpToAyah(e.currentTarget.form.jump.value - 1)}
          disabled={currentAyah === ayahs.length - 1} 
          className={styles.button}>اذهب</button>
</form>
        <button onClick={() => jumpToAyah(currentAyah + 1)} disabled={currentAyah === ayahs.length - 1} className={styles.button}>التالى</button>
        
    </div>
)}
</div>
</div>
{showForm && (
          <form onSubmit={handleJump}  >
          <input type="number" name="jump" min={1} max={ayahs.length} className={styles.input} defaultValue={1}/>

          <button type="submit" disabled={currentAyah === ayahs.length - 1} className={styles.button}  >عررض الأيه</button>
      </form>
  )}
      <br/><br/>
      <div>
          {jumpAyah !== null && (
              <div>
                  <p>{ayahs[jumpAyah - 1].text}</p>
              </div>
          )}
      </div>
      <Readervideos className="m-auto " />
  </div>
      
    );
}