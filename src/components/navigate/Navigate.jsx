/* eslint-disable react/prop-types */
"use client";

import React from "react";
import { useRouter } from "@/i18n/routing";
import { MdArrowBack } from "react-icons/md";

const Navigate = ({title}) => {
  const router = useRouter();
  return (
    <div>
      <div
        className=" flex items-center gap-2 text-[#2F799E] cursor-pointer"
        onClick={() => router.back()} 
      >
        <MdArrowBack />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Navigate;
