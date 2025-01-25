/* eslint-disable react/prop-types */
import React from "react";

import Link from "next/link";
import {  useTranslations } from "next-intl";
import { FaArrowRight, FaBookmark } from "react-icons/fa6";

import BaseUrl from "../baseApi/BaseApi";
import { useBookmarkArticleMutation } from "@/redux/Api/article";
import { toast } from "sonner";

const Articles = ({ item }) => {
  const a = useTranslations("article");

  const [addBookmark] = useBookmarkArticleMutation();

  const handleBookmark = async (id) => {
    console.log(id);
    try {
      const response = await addBookmark(id).unwrap();
      toast.success(response.message);
      console.log("Video bookmarked successfully!");
    } catch (error) {
      toast.error(response.message);
      console.log("Failed to bookmark article.");
    }
  };

  const calculateDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate - createdDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? `${differenceInDays} days ago` : "Today";
  };

  const constructImageUrl = (path) =>
    `${BaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const extractTextWithoutImage = (html) => {
    // Create a temporary DOM element
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Remove the first <img> tag if it exists
    const firstImg = tempElement.querySelector("img");
    if (firstImg) {
      firstImg.remove();
    }

    // Return the remaining innerHTML
    return tempElement.innerHTML;
  };

  

  return (
    <div className="mb-20">
      {item?.article_images?.slice(0, 1).map((image, index) => (
        <img
          key={index}
          src={constructImageUrl(image)}
          alt={`Article Image ${index + 2}`}
          className="object-cover w-full rounded-3xl"
        />
      ))}
      <div className="flex justify-between my-5">
        <h1 className="text-2xl font-bold">{item?.title}</h1>
      </div>
      <div
       dangerouslySetInnerHTML={{
        __html: extractTextWithoutImage(item?.description),
      }}
        className="description-content"
      />
      <div className="flex justify-between my-5">
        <div className="flex items-center gap-4">
          <span className="text-lg">{calculateDaysAgo(item.createdAt)}</span>

          <Link href={`articleDetails/${item._id}`}>
            <button className="flex items-center gap-1 bg-[#2F799E] text-white px-3 pl-5 py-2 rounded-full">
              {a("Read More")}{" "}
              <span className="bg-yellow-500 p-1 rounded-full text-[#2F799E]">
                <FaArrowRight />
              </span>
            </button>
          </Link>
        </div>
        <p
          onClick={() => handleBookmark(item._id)}
          className="text-2xl cursor-pointer"
        >
          <FaBookmark
            style={{ color: item.isBookmark === true ? "red" : "cadetblue" }}
          />
        </p>
      </div>
    </div>
  );
};

export default Articles;
