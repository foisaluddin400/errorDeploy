"use client";

import React from "react";
import { Form, Input, Button, message } from "antd";

import BaseUrl from "@/components/baseApi/BaseApi"; 
import { useLocale } from "next-intl";

const Page = () => {
  const locale = useLocale();
  const onFinish = async (values) => {
    const payload = {
      email: values.email,
    };

    try {
      const response = await fetch(`${BaseUrl}/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json(); 

      if (response.ok && responseData.success) {  
        localStorage.setItem("userEmail", values.email);
        message.success(responseData.message || "Password reset link sent!");
        console.log("Response Data:", responseData);
        window.location.href = `/${locale}/signIn/forgetpass/otp`;
      } else {
        message.error(responseData.message || "Failed to send reset link.");
        console.error("Error:", responseData);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again later.");
      console.error("Unexpected Error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen flex items-center md:pt-0 px-4 justify-center bg-[#2F799E]">
      <div className="w-full">
        <div className="gap-5">
          <div className="lg:flex lg:justify-center">
            <div className="bg-white lg:w-[500px] lg::px-16 px-5 py-16 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Forget Password
              </h2>

              <Form
                name="forgetPassword"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Email is required",
                    },
                    {
                      type: "email",
                      message: "Invalid email address",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full py-2 bg-[#2F799E] text-white rounded hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
