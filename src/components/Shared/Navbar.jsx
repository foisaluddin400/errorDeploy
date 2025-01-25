"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {  usePathname } from "next/navigation";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import logo from "../../../public/navbar/logo.png";
import language from "../../../public/navbar/language.png";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";


const Navbar = () => {
  const currentPath = usePathname();
  const locale = useLocale();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Check for token in localStorage
    setIsLoggedIn(!!token); // Set state based on token presence
  }, []);
  const navItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Video",
      path: "/video",
    },
    {
      title: "Article",
      path: "/article",
    },
  ];

  const changeLanguage = (language) => {
    if (language === "Eng") {
      window.location.href = "/en";
    } else {
      window.location.href = "/es";
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken')
   
    
    window.location.href = `/${locale}/signIn`; 
   
  }

  const n = useTranslations("navbar");
  return (
    <div className="flex justify-between items-center px-4 lg:px-0">
      <div className="flex">
        <div className="lg:hidden">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <div className="">
                <label htmlFor="my-drawer" className="text-3xl text-white">
                  <FaBars />
                </label>
              </div>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay z-50"
              ></label>
              <ul className="menu bg-[#2F799E] text-white z-50  min-h-full w-80 p-4 flex flex-col">
                <div className="flex justify-center mb-4">
                  <Image src={logo} alt="logo" width={100} height={80} />
                </div>
                {navItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.path}
                      className={`${
                        currentPath.replace(`/${locale}`, "") ===
                        (item.path === "/" ? "" : item.path)
                          ? "text-yellow-200 "
                          : "hover:text-gray-300"
                      }`}
                    >
                      <div className="border-b border-neutral-300 py-5">
                        {n(`${item.title}`)}
                      </div>
                    </Link>
                  </div>
                ))}
                <div className="flex-grow"></div>
                <div className="mb-4">
                  <Link href={"/personalInfo"}>
                    <div className="bg-[#57a6ce] p-2 rounded flex justify-center">
                      <FaRegUserCircle className="text-2xl" />
                    </div>
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image src={logo} alt="logo" width={70} height={80} />
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex gap-16">
        <div className="flex gap-16 text-white">
          {navItems.map((item, index) => (
            <div key={index}>
              <Link
                href={item.path}
                className={`${
                  currentPath.replace(`/${locale}`, "") ===
                  (item.path === "/" ? "" : item.path)
                    ? "text-yellow-200 underline "
                    : "hover:text-gray-300"
                }`}
              >
                {n(`${item.title}`)}
              </Link>
            </div>
          ))}
        </div>
        <div>
            {isLoggedIn ? (
              <button onClick={handleLogOut} className="text-white">
                Log Out
              </button>
            ) : (
              <Link href={`${locale}/signIn`} className="text-white">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="my-2 lg:my-0 flex lg:flex-col py-2">
        <div className="border border-white flex rounded">
          <div className="flex items-center ">
            <div className=" flex items-center p-1">
              <Image src={language} alt="language" width={23} height={20} />
            </div>
          </div>
          <button
            onClick={() => changeLanguage("Eng")}
            className={`px-4 py-2  ${
              locale === "en" ? "bg-white text-[#2F799E]" : "text-[#FFFFFF]"
            }`}
          >
            Eng
          </button>
          <button
            onClick={() => changeLanguage("Esp")}
            className={`px-4 py-2 ${
              locale === "es" ? "bg-white text-[#2F799E]" : "text-[#FFFFFF]"
            }`}
          >
            Esp
          </button>
        </div>
        <div className="text-yellow-100 flex text-3xl justify-end mt-1 gap-2">
          <Link href={"/notification"}>
            <IoMdNotificationsOutline />
          </Link>
          <div className="hidden lg:block">
            <Link href={"/personalInfo"}>
              <FaRegUserCircle />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
