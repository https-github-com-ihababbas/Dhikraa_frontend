
'use client';

import React from "react";

import ACard from '../components/aboutCards'

import style from '../styles/aboutus.module.css'
import styles from "../styles/quiz.module.css"
import image from "public/assets/image.png";
import Image from "next/image";
export default function About() {
    return (
        <>
         <div className={styles.wp_caption} >
            <Image
                src={image}
                alt="background"
                width={9999}
                height={300}
                className={styles.demo} >

            </Image>
            <div className={styles.wp_caption_text}>
                    
                        <h1 className="relative pb-2 text-5xl">منْ نَحْنُ وَمَاذَا نَفْعَل </h1>
                  </div>
            </div>
        <div className={style.back}>
       
        <div className="inline border-2 border-red-900 justify-self-center dark:text-white" >
            
            <p className="w-6/12 m-10 text-lg text-center dark:text-white " style={{ marginLeft: "25%" }}>
            مُهِمَّةٌ هَذَا الْمَوْقِع تتلخص فِي إنْشَاءِ مَوْقِع إسْلَامِيّ راقِي ، يُمَثِّل الدَّيْنِ عَلَى أَحْسَنِ وَجْه وَالْحِرْصِ عَلَى خَوْضِ تَجْرِبَة جَيِّدَة للمستخدم مِنْ خِلَالِ تَوَفَّر عَدَدٍ مِنْ الأمورالبسيطة الَّتِي قَدْ يَسْتَخْدِمَهَا أَيْ شَخْصٍ مُسْلِم فيحياته اليَوْمِيَّة ، وَوُجُود صفحتين تَفاعُلِيَّة حَيْث بِإِمْكَان المستخدم اخْتِبَار مَعْلُومَاتِه الأسَاسِيَّة وَإِنْشَاء قَائِمَةٌ مَهامّ خَاصَّةٍ فِيهِ .            </p>
            
      <h5 class="m-3 text-2xl italic font-bold text-center text-black dark:text-white text-green-900">قَيِّم الْمَوْقِع </h5>
      <p class="w-6/12 m-10 text-lg text-center dark:text-white" style={{ marginLeft: "25%" }}>
      مَا يتركز عَلَيْه الْمَوْقِع هُوَ أَنْ كُلَّ شَخْصٍ فِينَا عِنْدَهُ جَانِبُ جَيِّد ، وَلَيْسَ مِنَّا مَنْ هُوَ مَعْصُومٌ عَنْ الْخَطَأِ أَوْ الزَّلَل ، إنَّمَا ثد يَحْتَاجُ إلَى تَوْجِيهٍ مُعَيَّنٍ أَوْ مُسَاعِدَةُ تعيديه وتساعده عَلَى الِاسْتِمْرَارِ عَلَى الطَّرِيقِ الصَّحِيحِ والقويم الَّذِي نحتاجه جَمِيعًا فِي حَيَاتِنَا الدُّنْيَا وَالْآخِرَةِ 
.
         </p>
         <img  className={style.aboutusimage} src="/assets/cover.png" alt=""/>
         
          <ACard />

          <div className={style.part2}>
        <h1 className="m-3 text-2xl italic font-bold text-center text-green-900">ذِكْرَى بالأرقام </h1>
        <div className={style.part1}>
          <div className={style.inner}>
          <h1  className="m-3 text-2xl italic font-bold text-center text-green-900">2023</h1>
          <p className={`${style.p1} dark:text-white`} >سَنَّةُ النَّشْأَة </p>
          </div>
          <div className={style.inner}>
          <h1  className="m-3 text-2xl italic font-bold text-center text-green-900">10+</h1>
          <p className={`${style.p1} dark:text-white`} >عَدَدِ الْقُرَّاءِ</p>
          </div>
          <div className={style.inner}>
          <h1  className="m-3 text-2xl italic font-bold text-center text-green-900">1000+</h1>
          <p className={`${style.p1} dark:text-white`} >المستخدمين الفعالين</p>
          </div>
          <div className={style.inner}>
          <h1  className="m-3 text-2xl italic font-bold text-center text-green-900">75 L</h1>
          <p className={`${style.p1} dark:text-white`}  >زمزم في الشهر</p>
          </div>
          <div className={style.inner}>
          <h1  className="m-3 text-2xl italic font-bold text-center text-green-900">300+ JD</h1>
          <p className={`${style.p1} dark:text-white`} >معدل أموال الصدقة</p>
          </div>
          <div className={style.inner}>
          <h1  className="m-3 text-2xl italic font-bold text-center text-green-900">12</h1>
          <p className={`${style.p1} dark:text-white`}  >المدن المخدومة</p>
          </div>
        </div>
        <p className={`${style.p1} dark:text-white`} >
        فِي نِهَايَةِ مَا نُرِيدُ هُوَ أَنْ نُخَلِّصَ عَمِلْنَا ابْتِغَاءَ وَجْهِ اللَّهِ وإعمار الْأَرْض وَالْحِرْصِ عَلَى خِدْمَةِ الْمُجْتَمَعِ الْمَحَلِّيّ وَجَمِيعِ الْمُسْلِمِينَ ، وَالِاسْتِمْرَارِ فِي تَقْدِيمِ مَا يُمَيِّزُ بِهِ دِينِنَا الْحَنِيف لِلْجَمِيع بِطُرُق مُمَيِّزَة وجديدة وحصرية وبالصورة الصَّحِيحَة
        </p>
         </div>
        </div>
        </div>
        </>
 
    )
}