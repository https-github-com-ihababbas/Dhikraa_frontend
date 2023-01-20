'use client'

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext()

export default function ThemeWeapper({children}) {

    const [isDarkTheme, setIsDarkTheme] = useState(true)
    
    function initialThemeHandle() {
        isDarkTheme && document.querySelector("body").classList.add("dark")
    }

    function toggleThemeHandler(){
        setIsDarkTheme(!isDarkTheme)
        document.querySelector("body").classList.toggle("dark")
    }

    const globalState = {
        isDarkTheme:true,
        toggleThemeHandler
    }

    useEffect(()=>initialThemeHandle())

    return(
        <ThemeContext.Provider value={globalState}>
            {children}
        </ThemeContext.Provider>
    )
}