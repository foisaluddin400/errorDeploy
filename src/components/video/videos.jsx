/* eslint-disable react/prop-types */
'use client'
import React from "react";
import { Link } from "@/i18n/routing";
import moment from "moment";
import { FaBookmark } from "react-icons/fa6";
import BaseUrl from "../baseApi/BaseApi";
import { useBookmarkVideosMutation } from "@/redux/Api/videoApi";
import { toast } from "sonner";

const Videos = ({ videose }) => {

  const [addBookmark] =  useBookmarkVideosMutation();


const handleBookmark = async (id) => {
  console.log(id)
  try {
    const response = await addBookmark(id).unwrap();
    toast.success(response.message || "Video bookmark successfully!")
    console.lg("Video bookmark successfully!");
  } catch (error) {
    toast.error(response.message)
  }
};

  return (
    <div>
      <Link href={`videdetails/${videose._id}`}>
        <div className="relative">
          <img
            src={`${BaseUrl}/${videose.thumbnail_image}`}
            alt={videose.title}
            className="w-full h-[300px] object-cover"
          />
          <button className="absolute p-3 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-5.197-3.482a1 1 0 00-1.555.832v6.964a1 1 0 001.555.832l5.197-3.482a1 1 0 000-1.664z"
              />
            </svg>
          </button>
        </div>
      </Link>

      <div className="p-2 bg-[#2F799E] text-white -mt-[1px]">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold truncate">{videose.title}</h2>
          <p onClick={() => handleBookmark(videose._id)} className="text-2xl cursor-pointer">
          <FaBookmark
              style={{ color: videose.isBookmark===true ? "red" : "white" }}
            />
          </p>
        </div>

        <div className="gap-2">
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
            <span>{videose.totalView} views</span>
            <span></span>
            <span>{moment(videose.createdAt).fromNow()}</span> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
