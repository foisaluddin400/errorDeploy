/* eslint-disable no-constant-binary-expression */
"use client";
import React from "react";
import { useEffect, useState } from "react";

import { Form, Input, Button, Select, message} from "antd";
import ChangPassword from "./ChangPassword";
import { useTranslations } from "next-intl";
import { IoCameraOutline } from "react-icons/io5";
import { useGetUserQuery, useUpdateProfileeMutation } from "@/redux/Api/webmanageApi";
import BaseUrl from "../baseApi/BaseApi";
import Loading from "../Loading";
import { toast } from "sonner";

const { Option } = Select;

const EditProfile = () => {
  // Tab state
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("personalInfo");
  const p = useTranslations("profile");

  const { data: userProfile, isLoading: loadingProfile } = useGetUserQuery();
  const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileeMutation();
  console.log(userProfile)
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (userProfile?.data) {
      const user = userProfile.data;
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender || "",
      });
    }
  }, [userProfile, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

 

  const onFinish = async (values) => {
    const data = new FormData();
    data.append("username", values.username);
    data.append("phone", values.phone);
    data.append("gender", values.gender);
    if (image) {
      data.append("profile_image", image);
    }

    try {
      const response = await updateProfile(data).unwrap();
      toast.success(response.message );
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  if (loadingProfile) {
    return <Loading></Loading>;
  }

  const user = userProfile?.data;

  return (
    <div className="max-w-[1400px] m-auto px-4 lg:px-0 pb-32">
      <div className="md:flex justify-center gap-11">
        <div>
          <div className="flex justify-center">
            <div className="relative w-[140px] h-[124px] mx-auto">
            <input
                type="file"
                onChange={handleImageChange}
                id="img"
                style={{ display: "none" }}
              />
              <img
                style={{ width: 140, height: 140, borderRadius: "100%" }}
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `${BaseUrl}/${user?.profile_image}` || "/default-profile.png"
                }
                alt="Profile"
              />
              {activeTab === "personalInfo" && (
                <label
                  htmlFor="img"
                  className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                >
                  <IoCameraOutline className="text-black " />
                </label>
              )}
            </div>
          </div>
          <div className="text-center">
            <p className="font-semibold mt-6">{user?.username || "N/A"}</p>
            <p>{user?.email || "N/A"}</p>
          </div>
        </div>

        {/* Tab navigation */}
        <div>
          <div className="flex space-x-4 pb-2 mt-11 mb-9">
            <button
              className={`${
                activeTab === "personalInfo"
                  ? " border-b-4 border-blue-600"
                  : ""
              }`}
              onClick={() => setActiveTab("personalInfo")}
            >
              {p("Edit Profile")}
            </button>
            <button
              className={`${
                activeTab === "bookMark" ? "border-b-4 border-blue-600" : ""
              }`}
              onClick={() => setActiveTab("bookMark")}
            >
              {p("Change Password")}
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "personalInfo" && (
            <div>
               <Form
              className="bg-white p-4 rounded md:w-[590px]"
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <h1 className="text-xl font-bold text-center mb-5">Edit Your Profile</h1>
              <Form.Item
                label="User Name"
                name="username"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="User Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input placeholder="Email" disabled />
              </Form.Item>
              <Form.Item
                label="Contact Number"
                name="phone"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input placeholder="Phone" />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select your gender" }]}
              >
                <Select placeholder="Select Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <div className="flex justify-center mt-11">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="px-11 py-1 bg-[#2F799E] text-white rounded"
                  loading={updatingProfile}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
            </div>
          )}

          {activeTab === "bookMark" && (
            <div>
              <ChangPassword />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
