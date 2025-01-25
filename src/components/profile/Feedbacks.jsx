'use client';
import React, { useState } from "react";
import Image from "next/image";
import profile from "../../../public/article/profile.png";
import { useTranslations } from "next-intl";
import { usePostFeedbackMutation } from "@/redux/Api/webmanageApi";

const Feedbacks = () => {
  const f = useTranslations('footer');
  const [feedbackAdd] = usePostFeedbackMutation();
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState(null); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await feedbackAdd({
        description: feedback,
      }).unwrap(); 
      setMessage("Feedback submitted successfully!");
      setFeedback(""); 
    } catch (error) {
      setMessage("Failed to submit feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="max-w-[900px] m-auto">
      <div>
        <div className="flex items-center gap-4">
          <div>
            <Image
              className="rounded-full"
              src={profile}
              width={100}
              height={100}
              alt="profile"
            />
          </div>

          <div>
            <p className="mt-1 font-semibold">Ian</p>
            <p>ian@gmail.com</p>
          </div>
        </div>
        <div className="mt-11">
          <form onSubmit={handleSubmit}>
            <label>
              {f("Feedback")} <br />
              <textarea
                className="bg-white border rounded w-full h-[150px] p-2"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback here..."
                required
              />
            </label>
            <div className="flex justify-center mt-11">
              <input
                className="bg-[#2F799E] px-8 py-1 text-white rounded cursor-pointer"
                type="submit"
                value="Send"
              />
            </div>
          </form>
          {message && (
            <p className="mt-4 text-center text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
