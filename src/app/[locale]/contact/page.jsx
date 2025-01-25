
import React from "react";
import Contact from '@/components/contact/Contact';
import { useTranslations } from 'next-intl';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';



const page = () => {
  const p = useTranslations("profile")
  return (
    <div>
      <div className="bg-[#DBE3EA] py-8 ">
        <div className="max-w-[1400px] m-auto ">
          <h1 className="text-4xl font-bold">{p("More About")} </h1>
          <h1 className="text-white font-bold text-4xl  mt-2">
            <span className="text-zinc-600">-</span> {p("Contacting Us")}
          </h1>
        </div>
        <div className="flex justify-center mt-5 ">
          <Contact></Contact>
        </div>
      </div>

      <div className="bg-black my-20">
        <div className="max-w-[1400px] m-auto py-20">
          <h1 className="text-white md:text-5xl text-2xl">
            {p("Contact Us to")} <span className="text-[#545454]">{p("Explore")}</span> {p("Child")}{" "}
            <br /> {p("Learn")} <span className="text-[#545454]">{p("Opportunities")}</span>
          </h1>

          <div className="flex items-center text-white gap-20 mt-9">
            <div>
              <p>{p("Email")}</p>
              <p>email@gmail.com</p>
              <p>email@gmail.com</p>
            </div>
            <div>
              <p>{p("Contact Number")}</p>
              <p>+99 125 023 1253</p>
              <p>+99 125 023 1253</p>
            </div>

            <div className="flex items-center gap-2">
              <p>{p("Map")}</p>
              <FaArrowUpRightFromSquare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
