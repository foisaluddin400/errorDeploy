/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "@/i18n/routing";

import { FaBookmark } from "react-icons/fa6";
import BaseUrl from "../baseApi/BaseApi";
import { useBookmarkArticleMutation } from "@/redux/Api/article";

// eslint-disable-next-line react/prop-types
const ArticleBookmarks = ({ videose }) => {
  console.log(videose)

  const constructImageUrl = (path) =>
    `${BaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const [addBookmark] =  useBookmarkArticleMutation();
  
  
    const handleBookmark = async (id) => {
      console.log(id)
      try {
        const res = await addBookmark(id).unwrap();
        console.log(res)
        console.lg("Video bookmark successfully!");
      } catch (error) {
        console.log("Video to bookmat article.");
      }
    };
  return (
    <div>
      <Link href={`articleDetails/${videose._id}`}>
        <div className="relative">
        {videose?.article_images?.slice(0,1).map((image, index) => (
          <img
            key={index}
            src={constructImageUrl(image)}
              alt={`Article Image ${index + 2}`}
            className="object-cover w-full h-[300px]"
          />
        ))}
        </div>
      </Link>

      <div className="p-2 bg-[#2F799E] text-white -mt-[1px]">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold truncate">{videose.title}</h2>
          <p onClick={() => handleBookmark(videose._id)} className="text-2xl cursor-pointer">
                <FaBookmark
                    style={{ color: videose.isBookmark===true ? "red" : "green" }}
                  />
                </p>
        </div>

        {/* <div className="gap-2">
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
            <span>{videose.totalView} views</span>
            <span></span>
            <span>{moment(videose.createdAt).fromNow()}</span> 
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ArticleBookmarks;
