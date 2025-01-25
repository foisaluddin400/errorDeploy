"use client";
import React from "react";
import BaseUrl from "@/components/baseApi/BaseApi";
import Loading from "@/components/Loading";
import {

  useGetShortArtilesQuery,
  useGetSingleArticleQuery,
} from "@/redux/Api/article";


import { notFound, useParams } from "next/navigation";

const ArticleDetails = () => {
  const params = useParams();
  console.log(params)

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetSingleArticleQuery({ id: params?.id });
  console.log(apiResponse?.data?.category)

  const { data: releted, isLoading: isRelatedLoading } =
    useGetShortArtilesQuery({
      category: apiResponse?.data?.category._id,
    });

  const reletedData = releted?.data?.result || [];
  console.log(reletedData)

  if (isLoading) {
    return (
      <p className="h-screen">
        <Loading />
      </p>
    );
  }

  if (error) {
    return <p>Error fetching article data.</p>;
  }

  if (!apiResponse?.data) {
    return notFound();
  }

  const singleData = apiResponse.data;

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
    <div className="max-w-[1400px] px-4 lg:px-0 m-auto mb-20">
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <h1 className="my-6 text-2xl font-bold">{singleData.title}</h1>
          {singleData.article_images?.map((image, index) => (
            <img
              key={index}
              src={constructImageUrl(image)}
              alt={`Article Image ${index + 1}`}
              className="w-full my-4 rounded-lg"
            />
          ))}
          <div className="my-4 text-gray-700">
            <span className="text-sm text-gray-600">
              Published: {calculateDaysAgo(singleData.createdAt)}
            </span>
          </div>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: singleData.description }}
          />
        </div>

        <div className="mt-[72px] lg:ml-4 col-span-2">
          {isRelatedLoading ? (
            <Loading />
          ) : (
            reletedData.slice(0, 3).map((relat, index) => (
              <div
                key={index}
                className="flex bg-[#C0C9CD] rounded-xl my-1 mx-1 h-[140px]"
              >
                {relat.article_images?.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={constructImageUrl(image)}
                    alt={`Article Image ${imgIndex + 1}`}
                    className="rounded-tl-lg rounded-bl-lg w-[160px] h-[140px]"
                  />
                ))}

                <div className="p-3 py-5">
                  <p className="font-semibold">
                    {calculateDaysAgo(relat.createdAt)}
                  </p>
                  <p className="font-semibold">{relat.title}</p>
                  <div
                    //  dangerouslySetInnerHTML={{
                    //   __html: extractTextWithoutImage(relat?.descriptio),
                    // }}
                    dangerouslySetInnerHTML={{
                      __html:
                        extractTextWithoutImage(relat?.description)
                          ?.split(" ")
                          .slice(0, 8)
                          .join(" ") + "...",
                    }}
                    className="description-content"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
