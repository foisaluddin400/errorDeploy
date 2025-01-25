"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Form, Input, Button, message } from "antd";
import { usePostContuctMutation } from "@/redux/Api/email";

const Contact = () => {
  const [form] = Form.useForm(); // Ant Design Form hook
  const [contuct, { isLoading }] = usePostContuctMutation(); // POST mutation hook
  const p = useTranslations("profile");

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const response = await contuct(values).unwrap(); // Call the POST API and unwrap the response
      message.success("Message sent successfully!");
      console.log("Server Response:", response);
      form.resetFields(); // Clear the form fields after successful submission
    } catch (error) {
      message.error("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  

  return (
    <div className="bg-white p-4 w-[600px] rounded">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          message: "",
        }}
      >
        <Form.Item
          label={<span className="font-semibold">{p("Full Name")}</span>}
          name="name"
          rules={[{ required: true, message: "Full Name is required" }]}
        >
          <Input placeholder="John Cooper" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label={<span className="font-semibold">{p("Email")}</span>}
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input placeholder="johncooper@gmail.com" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">{p("Contact Number")}</span>}
            name="phone"
            rules={[{ required: true, message: "Contact Number is required" }]}
          >
            <Input placeholder="+99 4543 34543 213" />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-semibold">{p("Description")}</span>}
          name="message"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea placeholder="Type here" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-6" loading={isLoading}>
            {p("Send")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
