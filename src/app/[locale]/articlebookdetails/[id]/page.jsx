
import React from "react";
import Navigate from "@/components/navigate/Navigate";
import Image from "next/image";


import img from "../../../../../public/home/popular.png";
import img4 from "../../../../../public/home/popular.png";
import { useTranslations } from "next-intl";

const page = ({ params }) => {
  const { id } = params;
  const related = [
    {
      id: 1,
      title1: "Education is the most powerful weapon",
      time1: "2 day's ago",
      detaisl:
        " These include exhibitions,  presentations, competitions, technical events,",
      thumbnail1: img4,
    },
    {
      id: 1,
      title1: "Education is the most powerful weapon",
      time1: "2 day's ago",
      detaisl:
        " These include exhibitions, seminars, projects, competitions, technical events,",
      thumbnail1: img4,
    },
    {
      id: 1,
      title1: "Education is the most powerful weapon",
      time1: "2 day's ago",
      detaisl:
        " These include exhibitions, seminars, projects, presentations, , technical events,",
      thumbnail1: img4,
    },
    {
      id: 1,
      title1: "Education is the most powerful weapon",
      time1: "2 day's ago",
      detaisl:
        " These include exhibitions, seminars, projects, presentations, ,",
      thumbnail1: img4,
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Education is the most powerful weapon",

      views: "1.3M views",
      time: "2 day's ago",
      thumbnail: img,
    },
    {
      id: 2,
      title: "Education is the most powerful weapon",

      views: "1.3M views",
      time: "2 day's ago",
      thumbnail: img,
    },
    {
      id: 3,
      title: "Education is the most powerful weapon",

      views: "1.3M views",
      time: "2 day's ago",
      thumbnail: img,
    },
    {
      id: 4,
      title: "Education is the most powerful weapon",

      views: "1.3M views",
      time: "2 day's ago",
      thumbnail: img,
    },
    {
      id: 5,
      title: "Education is the most powerful weapon",

      views: "1.3M views",
      time: "2 day's ago",
      thumbnail: img,
    },
    {
      id: 6,
      title: "Education is the most powerful weapon",

      views: "1.3M views",
      time: "2 day's ago",
      thumbnail: img,
    },
    {
      id: 7,
      title: "Education is the most powerful weapon",

      views: "1.3M views",
      time: "2 day's ago",
      thumbnail: img,
    },
    
  ];

  const article = videos.find((item) => item.id === parseInt(id));
  // if (!article) {
  //   return notFound();
  // }

  const h = useTranslations("hero")
  const p = useTranslations("profile")
  return (
    <div>
      <div className="p-5 max-w-[1400px] m-auto mb-20">
        <div className="flex items-center gap-2  my-5 mb-11">
          <div className="md:w-[20%]">
            <Navigate title={`${p("Details")}`}></Navigate>
          </div>
          <div className="md:w-[60%]">
            <label className="input input-bordered rounded-sm  flex items-center gap-2 bg-[#75BEE3] max-w-[900px] m-auto text-white relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 order-1"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow order-2 text-left bg-transparent placeholder-transparent"
                placeholder="Search"
              />
              <span className="absolute right-3 text-white pointer-events-none">
                {h("search")}
              </span>
            </label>
          </div>
        </div>

        <div className="md:grid grid-cols-3">
          <div className="col-span-2 mt-2 md:mr-4">
            <div className="relative">
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={100}
                height={100}
                className="w-full h-90 object-cover"
              />
            </div>
          </div>

          <div className="col-span-1 ">
            {related.slice(0, 3).map((relat) => (
              <>
                <div>
                  <div className="flex bg-[#C0C9CD] rounded-xl my-2 mx-1">
                    <Image
                      className="rounded-xl"
                      src={relat.thumbnail1}
                      width={140}
                      height={100}
                      alt="asdf"
                    />

                    <div className="p-3">
                      <p className="font-semibold"> {relat.time1}</p>
                      <p className=" font-semibold ">{relat.title1}</p>
                      <p className="text-sm">{relat.detaisl}</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-bold  text-[#2F799E]">{article.title}</h1>
        <h1 className=" font-bold  text-[#2F799E]">{article.time}</h1>

        <div></div>
      </div>
    </div>
  );
};

export default page;
