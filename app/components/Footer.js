import React from "react";
import logo from 'public/assets/Logo_dhekraa.png'
import Image from "next/image";

export default function Header() {
    return (
        // bg-cyan-900
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start space-y-6 bg-blue-900">
            <div className="flex flex-shrink-0 items-center">
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
            <div className="hidden sm:ml-6 sm:block">
                <p className="text-gray-300 font-center light text-mb-3"> &copy; copy Rights 2023 Dhikraa Team</p>
            </div>
            <div className="block sm:ml-6 sm:hidden">
                <p className="text-gray-300 font-center light text-mb-3"> &copy; copy Rights 2023 Dhikraa Team</p>
            </div>
        </div>
    )
}