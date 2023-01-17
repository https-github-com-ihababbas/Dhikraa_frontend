import React from "react";
import logo from 'public/assets/Logo_dhekraa.png'
import Image from "next/image";
import style from '../styles/header.module.css'
import styleFooter from '../styles/Footer.module.css'
import facebook from 'public/assets/facebook.png'
import instagram from 'public/assets/instagram.png'
import whatsApp from "public/assets/whatsApp.png";



export default function Header() {
    return (

        // bg-cyan-900
        <div className={` flex flex-1 items-center justify-center sm:items-stretch sm:justify-start space-y-6 ${style.nav}`}>
            <div className={`${styleFooter.padding} flex flex-shrink-0 items-center`}>
                <Image
                    className="block h-20 w-auto lg:hidden"
                    src={logo}
                    alt="logo"
                />
                <Image
                    className="hidden h-20 w-auto lg:block"
                    src={logo}
                    alt="logo"
                />
            </div>

            <div className={`${styleFooter.icon_padding} ${styleFooter.padding} flex flex-shrink-0 items-center`}>
                <Image
                    className="block h-8 w-auto lg:hidden"
                    src={instagram}
                    alt="logo"
                />
                <Image
                    className="hidden h-8 w-auto lg:block"
                    src={instagram}
                    alt="logo"
                />

                <Image
                    className="block h-9 w-auto lg:hidden"
                    src={facebook}
                    alt="logo"
                />
                <Image
                    className="hidden h-9 w-auto lg:block"
                    src={facebook}
                    alt="logo"
                />

                <Image
                    className="block h-8 w-auto lg:hidden"
                    src={whatsApp}
                    alt="logo"
                />
                <Image
                    className="hidden h-8 w-auto lg:block"
                    src={whatsApp}
                    alt="logo"
                />
            </div>
            <div className={styleFooter}>
                <div className={`${styleFooter.copyright_left} hidden sm:ml-6 sm:block`}>
                    <p className="text-gray-300 font-center light text-mb-3"> 07XXXXXXX</p>
                    <p className="text-gray-300 font-center light text-mb-3"> 06XXXXXXX</p>
                </div>
                <div className={`${styleFooter.copyright_left} hidden sm:ml-6 sm:block`}>
                    <p className="text-gray-300 font-center light text-mb-3"> dhikraa_team@dhikraa.com </p>
                </div>

            </div>
            <div>
                <div className={`${styleFooter.copyright_left} hidden sm:ml-6 sm:block`}>
                    <p className="text-gray-300 font-center light text-mb-3"> &copy; copy Rights 2023 Dhikraa Team</p>
                </div>
                <div className="block sm:ml-6 sm:hidden">
                    <p className="text-gray-300 font-center light text-mb-3"> &copy; copy Rights 2023 Dhikraa Team</p>
                </div>
            </div>
        </div>

    )
}