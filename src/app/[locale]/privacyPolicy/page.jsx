'use client';
import React from "react";
import Loading from "@/components/Loading";
import Navigate from "@/components/navigate/Navigate";
import { useGetprivecyConditionsQuery } from "@/redux/Api/webmanageApi";
import { useTranslations } from "next-intl";
import { NoData } from "@/components/NoData"; // Import NoData component for fallback

const Page = () => {
  const f = useTranslations("footer");
  const { data: privecy, isLoading, error } = useGetprivecyConditionsQuery();

  if (isLoading) {
    return (
      <p className="h-screen">
        <Loading />
      </p>
    );
  }

  if (error) {
    return <p>Error fetching data. Please try again later.</p>;
  }

  const { description } = privecy?.data || {};

  return (
    <div className="max-w-[1400px] m-auto pt-5 pb-20">
      <div className="md:w-[20%]">
        <Navigate title={`${f("privacy Policy")}`} />
      </div>

      <div className="mt-5">
        {description ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <NoData /> // Render NoData when description is missing
        )}
      </div>
    </div>
  );
};

export default Page;
