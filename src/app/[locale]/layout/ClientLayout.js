/* eslint-disable react/prop-types */
"use client";
import React from "react";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { usePathname } from "@/i18n/routing";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname === "/signIn" ||
    pathname === "/signIn/forgetpass" ||
    pathname === "/signUp" ||
    pathname === "/signIn/forgetpass/otp" ||
    pathname === "/signIn/forgetpass/otp/resetpassword";

  return (
    <>
      {!hideNavbarFooter && (
        <div className="bg-[#2F799E] z-50">
          <div className="max-w-[1400px] m-auto ">
            <Navbar />
          </div>
        </div>
      )}
      <hr />
      <div className="">{children}</div>
      {!hideNavbarFooter && (
        <div className="bg-[#2F799E] pb-2">
          <div className="">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
