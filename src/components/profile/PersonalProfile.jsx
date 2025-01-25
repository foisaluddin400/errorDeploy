/* eslint-disable no-constant-binary-expression */
"use client";
import React from "react";
import { useState } from "react";
import profile from "../../../public/article/profile.png";

import BookMark from "./BookMark";
import ArticleBookmark from "./ArticleBookmark";
import { Link } from "@/i18n/routing";
import { useTranslations } from "use-intl";
import { Form, Input, Button } from "antd";
import { useGetUserQuery } from "@/redux/Api/webmanageApi";
import BaseUrl from "../baseApi/BaseApi";
import Loading from "../Loading";

const PersonalProfile = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [activeTab1, setActiveTab1] = useState("video");
  const { data: userInfo, isLoading } = useGetUserQuery();
  
  const p = useTranslations("profile");
  const n = useTranslations("navbar");

  if (isLoading) {
    return <p className="h-screen"><Loading></Loading></p>;
  }

  return (
    <div className="max-w-[1400px] m-auto px-4 lg:px-0 mb-20">
      {/* Tab navigation */}
      <div className="flex pb-2 mt-4 mb-4 space-x-4">
        <button
          className={`${
            activeTab === "personalInfo" ? "border-b-4 border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("personalInfo")}
        >
          {p("Personal Info")}
        </button>
        <button
          className={`${
            activeTab === "bookMark" ? "border-b-4 border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("bookMark")}
        >
          {p("Book Mark")}
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "personalInfo" && (
        <div className="max-w-[700px] m-auto mt-20">
          <div className="flex justify-center">
            <img
              className="rounded-full h-[120px] w-[120px]"
              src={`${BaseUrl}/${userInfo?.data?.profile_image}` || profile}
              alt="profile"
            />
          </div>

          <div className="text-center">
            <p className="mt-1 font-semibold">
              {userInfo?.data?.username || "N/A"}
            </p>
            <p>{userInfo?.data?.email || "N/A"}</p>
          </div>

          <Form
            className="mt-16"
            layout="vertical"
            initialValues={{
              fullName: userInfo?.data?.username || "",
              email: userInfo?.data?.email || "",
              phone: userInfo?.data?.phone || "",
              address: userInfo?.data?.address || "",
            }}
          >
            <Form.Item label={p("Full Name")} name="fullName">
              <Input className="py-2" placeholder="Full Name" disabled />
            </Form.Item>

            <div className="grid grid-cols-2 gap-5">
              <Form.Item label={p("Email")} name="email">
                <Input className="py-2" placeholder="Email" disabled />
              </Form.Item>
              <Form.Item label={p("Contact Number")} name="phone">
                <Input className="py-2" placeholder="Phone" disabled />
              </Form.Item>
            </div>

            <Form.Item label={p("Address")} name="address">
              <Input className="py-2" placeholder="Address" disabled />
            </Form.Item>

            <div className="flex justify-center mt-11">
              <Link href={"/editprofile"}>
                <Button type="primary" className="py-1 px-11">
                  {p("Update")}
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      )}

      {activeTab === "bookMark" && (
        <div>
          <div className="flex justify-end -mt-14">
          <div className="grid grid-cols-2 p-[3px] mb-4 w-[200px] text-center text-white rounded-sm bg-cyan-700">
            <button
              className={`${
                activeTab1 === "video" ? "bg-white text-black col-span-1 text-center py-1 rounded-sm" : ""
              }`}
              onClick={() => setActiveTab1("video")}
            >
              video
            </button>
            <button
              className={`${
                activeTab1 === "article" ? "bg-white text-black col-span-1 text-center py-1 rounded-sm" : ""
              }`}
              onClick={() => setActiveTab1("article")}
            >
              article
            </button>
          </div>
          </div>

          {activeTab1 === "video" && (
            <div>
              <h1 className="text-[#3f8cb3] text-2xl pb-2 font-semibold">
                {`Vedio's`}
              </h1>
              <BookMark />
            </div>
          )}

          {activeTab1 === "article" && (
            <div>
              <h1 className="text-[#3f8cb3] text-2xl pb-2  font-semibold">
                {n("Article")}
              </h1>
              <ArticleBookmark />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalProfile;
