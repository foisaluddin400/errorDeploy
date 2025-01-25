"use client"; // Make sure the component is a client-side component

import React from "react";
import { Collapse } from "antd";
import { useTranslations } from "next-intl"; // Import the useTranslations hook
import { useGetFaqQuery } from "@/redux/Api/webmanageApi";
import Loading from "../Loading";
import { NoData } from "../NoData"; // Import NoData component for "No Data Found" message

const FaqSection = () => {
  const m = useTranslations("popular"); // Call useTranslations inside the component
  const { data: faqData, isLoading, error } = useGetFaqQuery();

  // Check if data is still loading
  if (isLoading) {
    return (
      <p>
        <Loading />
      </p>
    );
  }

  // Handle potential errors
  if (error) {
    return <p>Failed to load FAQs. Please try again later.</p>;
  }

  // Prepare items for the Ant Design Collapse component
  const items =
    faqData?.data?.map((faq) => ({
      key: faq.id,
      label: faq.question,
      children: <p>{faq.answer}</p>,
    })) || [];

  return (
    <div className="max-w-[800px] mx-auto px-4">
      <h1 className="text-2xl font-semibold text-center mt-16">{m("Faa")}</h1>

      {items.length > 0 ? (
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          items={items}
          expandIconPosition="right"
        />
      ) : (
        <p className="my-11 text-center text-2xl">No Faq Available</p>  // Show NoData component if no FAQs are available
      )}
    </div>
  );
};

export default FaqSection;
