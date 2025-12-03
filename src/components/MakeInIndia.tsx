import { BadgeCheck, UserStar } from "lucide-react";

export default function MakeInIndia() {
  return (
    <div className="bg-make-in-india-bg shadow-m-dark py-[30px] sm:py-[60px] px-[20px] sm:px-[40px] max-w-[1350px] mx-auto rounded-[20px] sm:rounded-[30px] mb-[30px] sm:mb-[50px]">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-[25px] md:gap-[40px]">
        <div className="left flex flex-col md:flex-row animate-float-3 items-center gap-[5px] md:gap-[15px] justify-center md:justify-start max-w-[300px] md:max-w-none mx-auto md:w-auto md:mx-0">
          <img
            src="/images/navbar/logo_white.png"
            alt="MindCurePath Logo"
            className="w-[70px] sm:w-[70px] flex-shrink-0"
          />

          <div className="content text-white text-center md:text-left">
            <h1 className="text-[20px] md:text-[26px] font-medium">
              MindCurePath
            </h1>

            <div className="text-[13px] md:hidden font-light flex flex-col">
              <p>India's own virtual counselling platform</p>
              <p>built by Indians, for Indians</p>
            </div>
            <p className="hidden md:block text-[14px] font-light uppercase">
              India's own virtual counselling platform built by Indians, for
              Indians
            </p>
          </div>
        </div>

        <div className="right text-white text-center sm:text-center animate-float-1">
          <h1 className="uppercase mb-[8px] sm:mb-[10px] text-[16px] sm:text-[20px] font-extralight tracking-wide leading-normal">
            Proudly Supports
          </h1>

          <h1 className="uppercase text-[28px] sm:text-[35px] font-bold tracking-wider leading-[28px] sm:leading-[35px] whitespace-nowrap">
            MAKE IN INDIA
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:justify-between gap-[20px] mt-[25px] sm:mt-[30px]">
        <div className="bg-[#45565b] text-white px-[20px] sm:px-[25px] animate-float-1 py-[20px] sm:py-[25px] rounded-[12px] sm:rounded-[15px] shadow-lg flex flex-col gap-[12px] sm:gap-[15px] w-full lg:w-[60%]">
          <p className="text-[14px] sm:text-[16px] leading-relaxed">
            Mind Cure Path proudly supports the Make in India initiative — a
            movement that celebrates innovation, entrepreneurship, and
            self-reliance across the nation. By connecting individuals with
            certified Indian counselors, therapists, Dieticians , academic
            advisors, financial consultants, and GST & taxation experts, we aim
            to build a trusted virtual platform where personal and professional
            guidance is accessible, affordable, and locally empowered.
          </p>

          <p className="text-[14px] sm:text-[16px] leading-relaxed">
            At Mind Cure Path, we believe true growth begins from within — both
            for individuals and for our nation. India's own virtual counseling
            platform — built by Indians, for Indians.
          </p>
        </div>

        <div className="text-white flex flex-col gap-[15px] sm:gap-[15px] w-full lg:w-[40%] self-start">
          <div className="bg-[#45565b] flex items-center gap-[15px] px-[18px] sm:px-[20px] py-[18px] animate-float-2 sm:py-[20px] rounded-[10px] shadow-lg w-full lg:min-w-[250px]">
            <BadgeCheck size={40} className="text-white" />

            <p className="text-[14px] sm:text-[16px]">
              Certified Indian Counselors, Therapists, Dieticians
            </p>
          </div>

          <div className="bg-[#45565b] flex items-center gap-[15px] px-[18px] sm:px-[20px] py-[18px] animate-float-3 sm:py-[20px] rounded-[10px] shadow-lg w-full lg:min-w-[250px]">
            <UserStar size={50} className="text-white" />

            <p className="text-[14px] sm:text-[16px]">
              Academic Advisors, Financial Consultants, GST & Taxation Experts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
