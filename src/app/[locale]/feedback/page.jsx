
import React from "react";
import Navigate from "@/components/navigate/Navigate";
import Feedbacks from "@/components/profile/Feedbacks";
import { useTranslations } from "next-intl";

const page = () => {
  const f = useTranslations('footer')
  return (
    <div>
      
      <div className="">
      <div className="max-w-[1400px] m-auto">
      <div className="mt-4">
        <Navigate title={`${f("Feedback")}`}></Navigate>
      </div>
      </div >
        <div className="py-40">
        <Feedbacks></Feedbacks>
        </div>
      </div>
    </div>
  );
};

export default page;
