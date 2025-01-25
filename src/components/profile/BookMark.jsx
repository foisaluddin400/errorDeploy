'use client';
import React from "react";
import Videos from "../video/videos";
import { useGetOnlyVideoQuery } from "@/redux/Api/videoApi";
import Loading from "../Loading";
import { NoData } from "../NoData";

const BookMark = () => {
  const { data, isLoading, error } = useGetOnlyVideoQuery();

  if (isLoading) {
    return (
      <p className="h-screen">
        <Loading />
      </p>
    );
  }

  if (error) {
    return <div>Error loading videos: {error.message}</div>;
  }

  // Filter videos that are bookmarked
  const videos = (data?.data?.result || []).filter(
    (video) => video.isBookmark === true
  );

  return (
    <div>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {videos.map((videose, i) => (
            <div key={i}>
              <Videos videose={videose} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg ">
          
         <NoData></NoData>
         
        </p>
      )}
    </div>
  );
};

export default BookMark;
