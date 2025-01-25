import React from "react";
import Navigate from "@/components/navigate/Navigate";
import EditProfile from "@/components/profile/EditProfile";
import { useTranslations } from "next-intl";


const page = () => {
  const p = useTranslations('profile')
  return (
    <div className="bg-neutral-100">
      <div className="flex justify-between pb-7 pt-4 max-w-[1400px] m-auto pl-4 md:pl-0">
      <div className="md:w-[20%]">
          <Navigate title={`${p("Profile")}`}></Navigate>
        </div>
      </div>
      <div className="md:py-24">
      <EditProfile></EditProfile>
      </div>
    </div>
  );
};

export default page;
