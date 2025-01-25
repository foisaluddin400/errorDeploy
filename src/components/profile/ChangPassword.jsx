"use client";
import React from "react";
import { useChangePasswordMutation } from "@/redux/Api/webmanageApi";
import { Form, Input, Button } from "antd";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ChangPassword = () => {
  const [form] = Form.useForm();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passError, setPassError] = useState("");
  const router = useRouter();

  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  const validatePasswords = () => {
    const newPassword = form.getFieldValue("newPassword");
    const confirmPassword = form.getFieldValue("confirmNewPassword");
    setPasswordMismatch(newPassword !== confirmPassword);
  };

  const onFinish = (values) => {
    if (values.newPassword === values.oldPassword) {
      setPassError("Your old password cannot be your new password.");
      return;
    }
    if (values.newPassword !== values.confirmNewPassword) {
      setPassError("Confirm password doesn't match.");
      return;
    }

    setPassError("");
    changePassword(values)
      .unwrap()
      .then(() => {
        
        toast.success(response.message);
        localStorage.removeItem("accessToken");
        router.push("/signIn");
      })
      .catch((error) => {
       
        toast.error(error?.data?.message || "Failed to change password.");
      });
  };

  return (
    <div className="max-w-[650px] m-auto">
      <Form
        form={form}
        className="bg-white p-4 md:w-[590px]"
        layout="vertical"
        onFinish={onFinish}
      >
        <h1 className="text-xl font-bold text-center mb-5">Change Password</h1>

        {/* Current Passwor */}
        <Form.Item
          label="Current Password"
          name="oldPassword"
          rules={[{ required: true, message: "Current password is required" }]}
        >
          <Input.Password placeholder="Current Password" />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "New password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            placeholder="New Password"
            onBlur={validatePasswords}
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Confirm Password"
          name="confirmNewPassword"
          rules={[{ required: true, message: "Confirm password is required" }]}
          validateStatus={passwordMismatch ? "error" : ""}
          help={passwordMismatch ? "Passwords do not match" : null}
        >
          <Input.Password
            placeholder="Confirm Password"
            onBlur={validatePasswords}
          />
        </Form.Item>

        {passError && (
          <p className="text-red-600 text-center">{passError}</p>
        )}

        {/* Submit Button */}
        <div className="flex justify-center mt-11">
          <Button
            type="primary"
            htmlType="submit"
            className="px-11 py-1 bg-[#2F799E] text-white rounded"
            loading={changePasswordLoading}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangPassword;
