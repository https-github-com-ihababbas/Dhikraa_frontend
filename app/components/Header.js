/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Fragment } from "react";
import { useContext ,useEffect,useState} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "public/assets/Logo_dhekraa.png";
import style from "../styles/header.module.css";
import Link from "next/link";
import { AuthContext } from "../contexts/auth";


export default function Header() {
  // const [username, setUsername] = useState("")
  const { tokens } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const { username } = useContext(AuthContext);
  
  const navigation = [
    { name: " الرئيسية ", href: "/", current: true },
    { name: " من نحن ", href: "/about", current: false },
    { name: " مواقيت الصلاة ", href: "/praytime", current: false },
    { name: " إستمع للقرآن ", href: "/reader", current: false },
  ];
  
  const userNav = [
    { name: " المهام ", href: "/todo", current: false },
    { name: " إختبـــر معلوماتك ", href: "/Quiz", current: false },
  ];
  
  function linkHanldle(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
 

  return (
    // bg-blue-900
    <Disclosure as="nav" className="bg-[#252f0b] ">
      {({ open }) => (
        <>
          <div className="relative flex items-center justify-between h-full">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              {tokens ? (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-11 h-11 rounded-full bg-[#778554] p-1"
                        src="./assets/logogray.png"
                        alt="profile image"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="bg-[#778554] absolute right--4 z-10 w-32 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={linkHanldle(
                              active ? "bg-[#e5f2c4] text-[#000] " : "",
                              "block px-4 py-2 text-l text-gray-700 w-full text-right text-[#e5f2c4] "
                            )}
                          >
                            الملف الشخصي
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={linkHanldle(
                              active ? "bg-[#e5f2c4] text-[#000]" : "",
                              "block px-4 py-2 text-l text-gray-700 w-full text-right text-[#e5f2c4] "
                            )}
                          >
                            تسجيل الخروج
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link href="/login" className="text-[#e5f2c4] mx-8 text-xl hover:text-[#949e7b] hover:border-b hover:delay-100 hover:border-[#949e7b]">
                  تسجيل الدخول
                </Link>
              )}
            </div>

            <div className="flex justify-center h-full items-right sm:items-stretch sm:justify-start">

              <div className="justify-center hidden mt-6 sm:ml-6 sm:block">

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='text-xl py-1 text-[#e5f2c4] h-full mx-8 hover:text-[#949e7b] hover:border-b hover:delay-100 hover:border-[#949e7b] text-justify '
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
                
                  {tokens &&userNav.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='text-xl py-1 text-[#e5f2c4] h-full mx-8 hover:text-[#949e7b] hover:border-b hover:delay-100 hover:border-[#949e7b] text-justify'
                    // aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {username=='admin' && <Link
                    key='admin'
                    href='/admin'
                    className='text-xl py-1 text-[#e5f2c4] h-full mx-8 hover:text-[#949e7b] hover:border-b hover:delay-100 hover:border-[#949e7b] text-right '
                    
                  >
                    الإدارة
                  </Link>}
                    {console.log(username)}

              </div>

              <div className="flex items-center flex-shrink-0 mx-5">
                <Link key="logo" href="/">
                  <Image
                    className="block w-auto h-20 lg:hidden"
                    src={logo}
                    alt="logo"
                  />
                  <Image
                    className="hidden w-auto h-20 lg:block"
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </div>

            </div>
          </div>

         
        </>
      )}
    </Disclosure>
  );
}
