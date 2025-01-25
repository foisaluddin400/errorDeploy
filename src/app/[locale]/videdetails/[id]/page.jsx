"use client";
import React from "react";

import Navigate from "@/components/navigate/Navigate";
import { useTranslations } from "next-intl";

import {
  useGetCategoryVideosQuery,
  useGetSingleVideosQuery,
} from "@/redux/Api/videoApi";
import { useParams } from "next/navigation";
import BaseUrl from "@/components/baseApi/BaseApi";

import Loading from "@/components/Loading";

const page = () => {
  const params = useParams();
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetSingleVideosQuery({ id: params?.id });

  const a = useTranslations("hero");
  const p = useTranslations("profile");

  const { data: releted, isLoading: isLoadingRelated } = useGetCategoryVideosQuery({
    category: apiResponse?.data?.category,
  });

  const reletedData = releted?.data?.result || [];
  console.log(reletedData);

  if (isLoading) {
    return <p className="h-screen"><Loading></Loading></p>;
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-red-500">
        Failed to load video details.
      </p>
    );
  }

  const videoData = apiResponse?.data;

  // Ensure BaseUrl and path are properly combined
  const constructUrl = (path) =>
    path ? `${BaseUrl.replace(/\/$/, "")}${path.replace(/\\/g, "/")}` : "";

  const videoUrl = constructUrl(videoData?.video); // Construct video URL
  const thumbnailUrl = constructUrl(videoData?.thumbnail_image);

  console.log(videoUrl);

  // const constructImageUrl = (path) =>
  //   `${BaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  return (
    <div>
      <div className="max-w-[1400px] px-4 lg:px-0 m-auto mb-20">
        <div className="flex items-center gap-2 my-5 mb-11">
          <div className="md:w-[20%]">
            <Navigate title={`${p("Details")}`}></Navigate>
          </div>
          <div className="md:w-[60%]">
            <label className="input input-bordered rounded-sm flex items-center gap-2 bg-[#75BEE3] max-w-[900px] m-auto text-white relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="order-1 w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="order-2 text-left placeholder-transparent bg-transparent grow"
                placeholder="Search"
              />
              <span className="absolute text-white pointer-events-none right-3">
                {a("search")}
              </span>
            </label>
          </div>
        </div>

        <div className="grid-cols-3 lg:grid">
          <div className="col-span-2 mt-2 md:mr-4">
            <div className="relative">
              <video
                src={videoUrl}
                poster={thumbnailUrl}
                className="object-cover w-full h-90"
                controls
                autoPlay
              />
            </div>

            <h1 className="text-2xl font-bold text-[#2F799E] mt-5">
              {videoData?.title}
            </h1>
            <p className="mt-3 text-gray-600 text-md">
              {videoData?.description}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Views: {videoData?.totalView}
            </p>
          </div>

          <div className="col-span-1 ">
            <div>
              {isLoadingRelated ? (
                // Show loading spinner or animation for related videos
                <Loading />
              ) : (
                reletedData.slice(0, 3).map((relat) => (
                  <div key={relat.id}>
                    <div className="flex bg-[#C0C9CD] rounded-xl  my-2 mx-1">
                      <img
                        src={`${BaseUrl}/${relat.thumbnail_image}`}
                        alt={relat.title}
                        className="rounded-tl-lg  rounded-bl-lg w-[150px] "
                      />

                      <div className="p-3 py-5">
                        <p className="font-semibold"> </p>
                        <p className="font-semibold ">{relat.title}</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: relat?.description
                              ?.split(" ")
                              .slice(0, 8)
                              .join(" ") + "...",
                          }}
                          className="description-content"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default page;
