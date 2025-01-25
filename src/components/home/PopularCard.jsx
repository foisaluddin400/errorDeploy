/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "@/i18n/routing";
import BaseUrl from "../baseApi/BaseApi";
import moment from "moment";

const PopularCard = ({video}) => {
    return (
      <div>
      <Link href={`/videdetails/${video._id}`}>
        <div className="relative">
          <img
            src={`${BaseUrl}/${video.thumbnail_image}`}
            alt={video.title}
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
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold truncate">{video.title}</h2>
          
        </div>

        <div className="gap-2">
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
            <span>{video.totalView} views</span>
            
            <span>{moment(video.createdAt).fromNow()}</span> 
          </div>
        </div>
      </div>
    </div>
    );
};

export default PopularCard;
