'use client';
import React, { useState } from "react";
import Image from "next/image";
import line from "../../../public/home/line.png";
import PopularCard from "./PopularCard";
import { useTranslations } from "next-intl";
import { useGetshortVideosQuery } from "@/redux/Api/videoApi";
import { NoData } from "@/components/NoData"; // Import the NoData component

const PopularVideo = () => {
  const [sort, setSort] = useState("-totalView");
  const { data: videoData } = useGetshortVideosQuery({ sort });
  const videos = videoData?.data?.result || [];

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const p = useTranslations("popular");

  return (
    <div className="px-4 lg:px-0">
      <div className="py-5 text-center">
        <h1 className="text-[#2F799E] text-2xl font-bold font-serif">
          {p("Popular Videos")}
        </h1>
        <div className="flex justify-center mt-3">
          <Image src={line} width={250} height={50} alt="line" />
        </div>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {videos.slice(0, 8).map((video) => (
            <div key={video.id}>
              <PopularCard video={video} />
            </div>
          ))}
        </div>
      ) : (
        <p className="my-11 text-center text-2xl">No Popular Videos Available</p> // Render NoData when no videos are found
      )}
    </div>
  );
};

export default PopularVideo;
