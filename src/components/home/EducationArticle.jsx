"use client";
import React from "react";
import Image from "next/image";
import ball from "../../../public/home/ball.png";
import pencile from "../../../public/home/pencile.png";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useGetCategoryQuery } from "@/redux/Api/categoryApi";
import BaseUrl from "../baseApi/BaseApi";
import Loading from "../Loading";
import { NoData } from "../NoData"; // Import NoData component

const EducationArticle = () => {
  const { data: categoryArticle, isLoading, error } = useGetCategoryQuery();
  const t = useTranslations("popular");
  const m = useTranslations("article");

  if (isLoading) {
    return (
      <p>
        <Loading />
      </p>
    );
  }

  if (error) {
    return <p>Failed to load categories. Please try again later.</p>;
  }

  const categories =
    categoryArticle?.data?.map((item) => ({
      id: item._id,
      title: item.name,
      thumbnail: item.category_image,
    })) || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Image src={ball} width={100} height={100} alt="ball" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-[#2F799E] font-serif">
            {t("Educational Article")}
          </h3>
          <h1 className="text-4xl font-bold mt-2 text-[#2F799E]">
            {t("For Kids")}
          </h1>
        </div>
        <div>
          <Image src={pencile} width={100} height={100} alt="pencil" />
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="md:grid grid-cols-2 mt-9">
          {categories.map((item) => (
            <div key={item.id}>
              <div className="rounded-2xl p-6 py-8 flex items-center gap-11 bg-[#2F799E] m-3">
                <img
                  className="imgg w-[120px] h-[90px]"
                  src={`${BaseUrl}/${item.thumbnail}`}
                  alt={item.title}
                />
                <div>
                  <h2 className="text-white text-2xl">{item.title}</h2>
                  <Link href={`/${item.id}`}>
                    <button className="bg-white rounded py-1 px-2 mt-6 flex items-center gap-2">
                      {m("Read More")} <IoMdArrowForward className="mt-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-11 text-center text-2xl">No Category Available</p> // Display NoData when categories are empty
      )}
    </div>
  );
};

export default EducationArticle;
