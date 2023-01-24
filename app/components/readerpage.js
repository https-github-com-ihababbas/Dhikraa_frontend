import { useState, useEffect, useRef } from "react";
import { Reader } from "./data/reader"
import { Surah } from "./data/surah"
import styles from 'app/styles/reader.module.css';
import home_img from 'public/assets/back2.png';
import Image from 'next/image';
import Readervideos from "./readervidos";
import { Container } from "postcss";
import style from "../styles/todo.module.css"
import todo from "public/assets/quran1.png";
import { Icon } from '@iconify/react';
import zakaref from "public/assets/back44.png";
import line_img from "public/assets/line.png";


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
      if (data.data.ayahs && data.data.ayahs.length > 0) {
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
    <div className="bg-[#e5f2c4]">
      {/* <Image src={home_img} alt="Picture of the author" className={styles.image} /> */}
      <section className="flex justify-end ">

        <section className="w-5/6 pt-6">
          <div className="flex justify-center pl-40">

            <div className="text-5xl text-[#252f0b]   ">

              <h1 className="pl-9">
                إِسْتَمَعَ لِلْقُرْآنِ
              </h1>
              <Image className="justify-center" width={280} src={line_img} />
            </div>
          </div>

          <div className="flex justify-center w-full py-4 mb-8 rounded-md shadow-sm flex-right ">

            <div className="relative justify-center w-1/4 h-52 ">
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#949e7b] to-[#778554] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              </div>
              <div className="relative shadow-lg sm:rounded-3xl sm:p-1 ">
                <Image className="w-full h-52 rounded-3xl rad brightness-125 " src={todo} />
              </div>
            </div>
            <div className="w-7/12">
              <h1 className="mt-10 text-4xl justify-self-center text-right text-[#252f0b] dark:text-white" ></h1>
              <br />



              <p className="text-2xl text-[#252f0b]  text-right ml-14    ">
                <p className='pt-4 pb-2 text-3xl'>
                  وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا لَعَلَّكُمْ تُرْحَمُونَ              </p>
                <p >سورة الأعراف: 204

                </p>


              </p>




            </div>
          </div>
        </section>
        <Image className="justify-center h-52 w-52" src={zakaref} />

      </section>

      <div className="text-3xl text-[#252f0b] flex justify-center   ">
        <div>
          <h1 className="border-[#252f0b]  border-b-solid border-b-2 p-2 px-6">
            مَقَاطِع صَوْتِيَّةٍ
          </h1>

        </div>

      </div>





      <div className="mt-2">
        <section className="h-full py-4 ml-40 mr-40 rounded-md shadow-lg">
          <div className="flex justify-center py-12 pt-4">
            <select onChange={handleChange} className="px-4 py-3 mx-4 text-center rounded-2xl hover:bg-[#778554] ">
              {Surah.map(surah => (
                <option className="bg-[#778554]" key={surah.number} value={surah.number}> Surah {surah.number} - {surah.name}
                </option>

              )
              )}
            </select>
            <select onChange={(e) => setReaderCode(e.target.value)} className="px-4 py-3 mx-4 text-center rounded-2xl hover:bg-[#778554]">
              {Reader.map(reader => (
                <option key={reader.code} value={reader.code} className="bg-[#778554] border-2">{reader.name}
                </option>
              )
              )}
            </select>

            <button onClick={() => {
              callAPI();

              setShowForm(true);
            }} className=" w-24  text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">إبدأ السورة </button>

          </div>




          <div className="w-full ml-4 mr-2">
            <div className={styles.fulloudio}>

              {/* {showForm &&
            <div className="">
              <button onClick={() => jumpToAyah(currentAyah - 1)} disabled={currentAyah === 0} className={styles.wp_caption_text}>
              <Icon icon="material-symbols:arrow-back-rounded" width="30"/>


              </button>


            </div>} */}


              <div>

                {ayahs.length > 0 && (
                  <div className="">
                    <audio ref={audioRef} src={ayahs[currentAyah].audio} controls onEnded={playNextAyah} className={styles.audio} />
                    <div className="font-bold ">
                      <p className={styles.ayahText}>{ayahs[currentAyah].text}</p>
                    </div>
                  </div>
                )}
              </div>


              {/* {showForm &&
            <div className="">

              <button onClick={() => jumpToAyah(currentAyah + 1)} disabled={currentAyah === ayahs.length - 1} className={styles.wp_caption_right}>
              <Icon icon="material-symbols:arrow-forward-rounded" width="30"/>
              </button>

            </div>
          } */}


              {showForm && <form

                className="flex justify-center w-[15rem] "
              >
                <label className="mr-4 text-xl ">تحديد رقم الأية</label>
                <input type="number" name="jump" min={1} max={ayahs.length} className="w-[3rem] h-10 text-xl" onChange={(e) => jumpToAyah(e.currentTarget.form.jump.value - 1)} />

                {/* <button type="submit"
              onClick={(e) => jumpToAyah(e.currentTarget.form.jump.value - 1)}
              disabled={currentAyah === ayahs.length - 1}
              className=" ml-[40%]  py-1.5 px-2 flex text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">اذهب</button> */}
              </form>}
            </div>

          </div>
        </section>
      </div>











      {/* {showForm && (
        <form onSubmit={handleJump}  >
          <input type="number" name="jump" min={1} max={ayahs.length} className={styles.input} defaultValue={1} />

          <button type="submit" disabled={currentAyah === ayahs.length - 1} className="mb-14 ml-[40%]  py-1.5 px-2 flex text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  " >عررض الأيه</button>
        </form>
      )}
      <br /><br />
      <div>
        {jumpAyah !== null && (
          <div>
            <p>{ayahs[jumpAyah - 1].text}</p>
          </div>
        )}
      </div> */}

      



      <Readervideos className="m-auto " />
      <section className="flex justify-start">
        <Image className="justify-center rotate-180 h-52 w-52" width={300} src={zakaref} />

      </section>
    </div>

  );
}