'use client'
import React from "react";
import Articles from "@/components/articles/Articles";
import Navigate from "@/components/navigate/Navigate";
import { useGetShortCategoryQuery } from "@/redux/Api/categoryApi";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
const page = () => {
    const [searchTerm, setSearch] = useState("");
    const params = useParams();
    const { data, isLoading, error  } = useGetShortCategoryQuery({searchTerm, category : params.category});

   console.log(data)

    const m = useTranslations("hero");
      const p = useTranslations("profile");
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error loading articles: {error.message}</div>;
      }
    
      const articles = data?.data?.result || [];
      console.log(articles)
    return (
        <div className="max-w-[1400px] m-auto">
      <div className="mx-4 lg:mx-0">
        <div className="flex items-center gap-2 mt-5 lg:my-5 lg:mb-11 mb-5">
          <div className="md:w-[20%]">
            <Navigate title={`${p("All Article")}`} />
          </div>
          <div className="md:w-[60%]">
            <label className="input input-bordered rounded-sm flex items-center gap-2 bg-[#75BEE3] max-w-[900px] m-auto text-white relative">
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
              onChange={(e)=>setSearch(e.target.value)}
                type="text"
                className="grow order-2 text-left bg-transparent placeholder-transparent"
                placeholder="Search"
              />
              <span className="absolute right-3 text-white pointer-events-none">
                {m("search")}
              </span>
            </label>
          </div>
        </div>

        <div>
          {articles.map((item) => (
            <Articles key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
    );
};

export default page;