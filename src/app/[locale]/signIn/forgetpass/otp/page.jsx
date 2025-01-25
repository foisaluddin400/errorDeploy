"use client";
import React from "react";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { message } from "antd";
import BaseUrl from "@/components/baseApi/BaseApi";
import { useLocale } from "next-intl";

const Page = () => {
  const locale = useLocale();
  const [otp, setOtp] = useState("");
  const [email] = useState(localStorage.getItem("userEmail") || "");

  const handleVerify = async () => {
    if (!email) {
      message.error("Email not found. Please restart the reset process.");
      return;
    }

    if (otp.length !== 5) {
      message.error("Please enter the 5-digit OTP code.");
      return;
    }

    const payload = {
      email: email,
      resetCode: Number(otp),
    };

    try {
      const response = await fetch(`${BaseUrl}/auth/verify-reset-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        message.success(responseData.message || "OTP verified successfully!");
        console.log("Response Data:", responseData);
        window.location.href = `/${locale}/signIn/forgetpass/otp/resetpassword`;
      } else {
        message.error(responseData.message || "Failed to verify OTP.");
        console.error("Error:", responseData);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again later.");
      console.error("Unexpected Error:", error);
    }
  };

  const handleResend = async () => {
    if (!email) {
      message.error("Email not found. Please restart the reset process.");
      return;
    }

    const payload = {
      email: email,
    };

    try {
      const response = await fetch(`${BaseUrl}/auth/resend-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        alert('Reset code sent successfully!')
        console.log("Resend Response Data:", responseData);
      } else {
        message.error(responseData.message || "Failed to resend reset code.");
        console.error("Resend Error:", responseData);
      }
    } catch (error) {
      message.error("An unexpected error occurred while resending the code.");
      console.error("Unexpected Resend Error:", error);
    }
  };

  return (
    <div className="items-center justify-center px-4 flex min-h-screen bg-[#2F799E]">
      <div className="flex justify-center">
        <div className="bg-white lg:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Check your email
          </h2>
          <h3 className="text-[#333333] text-center mb-5">
            We sent a reset link to {email || "your email"}. Enter the 5-digit
            code mentioned in the email.
          </h3>
          <div className="flex justify-center mb-5">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderSeparator={<span className="mx-1"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-16 h-16 text-center bg-white text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ width: "40px", height: "50px" }}
                />
              )}
            />
          </div>
          <button
            onClick={handleVerify}
            className="w-full py-2 bg-[#2F799E] text-white rounded-md mb-4"
          >
            Verify Code
          </button>

          <span className="flex justify-center">
            You have not received the email?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleResend}
            >
              Resend
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
