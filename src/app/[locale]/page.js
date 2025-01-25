import React from "react";
import PopularVideo from "@/components/home/PopularVideo";
import SpecialVideo from "@/components/home/SpecialVideo";
import EducationArticle from "@/components/home/EducationArticle";
import FaqSection from "@/components/home/FaqSection";
import Hero from "@/components/home/Hero";
export default function Home() {
  return (
    <div className="max-w-[1400px] m-auto mb-20">
      <Hero></Hero>
      <PopularVideo></PopularVideo>
      <SpecialVideo></SpecialVideo>
      <EducationArticle></EducationArticle>
      <FaqSection></FaqSection>
    </div>
  );
}
