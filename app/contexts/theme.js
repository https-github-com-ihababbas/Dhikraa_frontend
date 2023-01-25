// 'use client';
// import { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// export default function ThemeWrapper({children}){
//     const [isDarkTheme, setIsDarkTheme] = useState(true);
//     const [inStorage, setInStorage] = useState("");

//     function initialThemeHandle(){
//         const inStorage = JSON.parse(localStorage.getItem('mode'))
//         if (inStorage === false){
//             setIsDarkTheme(inStorage)
//             console.log("inStorage",inStorage, "isDark", isDarkTheme)
//             document.querySelector("body").classList.remove("dark"); 
//         } else {

//             isDarkTheme && document.querySelector("body").classList.add("dark"); 
//         }
//     }
    
//     function toggleThemeHandler() {
//         setIsDarkTheme(!isDarkTheme);
//         document.querySelector("body").classList.toggle("dark"); 
//         localStorage.setItem('mode', JSON.stringify(!isDarkTheme))
//     }
    
//     const globalState = {
//         isDarkTheme: true,
//         toggleThemeHandler
//     }

//     useEffect(()=> {
//         const inStorage = JSON.parse(localStorage.getItem('mode'))
//         if (inStorage){
//             setInStorage(inStorage)
//         }
//         initialThemeHandle()
//     },[inStorage]);

//     return(
//         <ThemeContext.Provider value={globalState}>
//             {children}
//         </ThemeContext.Provider>
//     )

// }