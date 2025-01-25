"use client";

import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link } from "@/i18n/routing";
import BaseUrl from "@/components/baseApi/BaseApi";
import { toast } from "sonner";
const Page = () => {
  const [loading, setLoading] = useState(false); // Loading state for button

  const onFinish = async (values) => {
    setLoading(true); // Start loading
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch(`${BaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok && responseData.success) {
        // Login successful
        toast.success(responseData.message);
        localStorage.setItem("accessToken", responseData.data.accessToken);
        localStorage.setItem("refreshToken", responseData.data.refreshToken);
        window.location.href = "/"; // Redirect to the homepage
      } else {
        toast.error(responseData.message || "Login failed");
        console.error("Error:", responseData);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Unexpected Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div className="min-h-screen flex items-center md:pt-0 px-4 justify-center bg-[#2F799E]">
      <div className="w-full max-w-[1500px] m-auto">
        <div className="gap-5">
          <div className="lg:flex lg:justify-center">
            <div className="bg-white lg:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Welcome back!
              </h2>
              <p className="pb-7">Please log in to continue access</p>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-700">Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    href={"/signIn/forgetpass"}
                    className="text-sm text-[#2F799E] hover:underline focus:outline-none"
                  >
                    Forget password?
                  </Link>
                </div>

                <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading} // Loading state
                    className="w-full py-5 bg-[#2F799E] text-white"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
              <span className="flex justify-center">
                              already have an don't account?{" "}
                              <Link href={"signUp"}>
                                <span className="text-blue-500"> Sign Up</span>
                              </Link>
                            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
