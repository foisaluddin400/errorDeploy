'use client';
import React from "react";
import Loading from "@/components/Loading";
import Navigate from "@/components/navigate/Navigate";
import { useGetTermsContuctQuery } from "@/redux/Api/webmanageApi";
import { useTranslations } from "next-intl";
import { NoData } from "@/components/NoData"; // Import NoData for fallback message

const Page = () => {
  const f = useTranslations("footer");
  const { data: terms, isLoading, error } = useGetTermsContuctQuery();

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

  const { description } = terms?.data || {};

  return (
    <div className="max-w-[1400px] m-auto pt-5 pb-20">
      <div className="md:w-[20%]">
        <Navigate title={`${f("Terms & condition")}`} />
      </div>

      <div className="mt-5">
        {description ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <NoData /> // Show NoData if description is missing
        )}
      </div>
    </div>
  );
};

export default Page;
