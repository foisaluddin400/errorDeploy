import Image from "next/image";
import back from "../../../public/home/back.png";
import spec from "../../../public/home/spec.png";
import spec1 from "../../../public/home/spec1.png";
import spec2 from "../../../public/home/spec2.png";
import { useTranslations } from "next-intl";
const SpecialVideo = () => {
  const t = useTranslations("popular");
  return (
    <div
      className="relative bg-cover w-full bg-center lg:h-[90vh] h-[600px] mt-5 rounded"
      style={{
        backgroundImage: `url(${back.src})`,
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        
      }}
    >
      <div className="">
        <div className="absolute inset-0 flex  items-center text-white  ">
          <div className="lg:grid grid-cols-2 md:px-11 px-4 gap-7">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold ">
                {t("Special Video & Article For Your Children")}
              </h1>
             <div className="md:px-20 md:pt-5">
             <p className="mt-4 ">
                {t("Formulate")}
              </p>
              <button className="bg-white text-[#2F799E] px-6 py-2 rounded mt-5 border-4 border-yellow-100">{t("Learn more")}</button>
             </div>
            </div>
         
              <div className="md:mt-11 mt-4">
              <div className="lg:relative flex gap-1">
                <div className="lg:absolute lg:-mt-32 lg:ml-60">
                  <Image src={spec} width={300} height={100} alt="spec" />
                </div>
                <div className="lg:absolute lg:ml-28 lg:-mt-8">
                  <Image src={spec1} width={300} height={100} alt="spec" />
                </div>
                <div className="lg:absolute lg:mt-16">
                  <Image src={spec2} width={300} height={100} alt="spec" />
                </div>
              </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialVideo;
