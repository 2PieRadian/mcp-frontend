export default function MakeInIndia() {
  return (
    <div className="bg-make-in-india-bg animate-float-3 py-[30px] sm:py-[60px] px-[20px] sm:px-[40px] max-w-[1350px] mx-auto rounded-[20px] sm:rounded-[30px] mb-[30px] sm:mb-[50px]">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-[20px] sm:gap-[20px]">
        <div className="left flex flex-col sm:flex-row animate-float-2 items-center gap-[5px] sm:gap-[15px] justify-center sm:justify-start max-w-[300px] sm:max-w-none mx-auto sm:w-auto sm:mx-0">
          <img
            src="/images/navbar/logo_white.png"
            alt="MindCurePath Logo"
            className="w-[70px] sm:w-[70px] flex-shrink-0"
          />

          <div className="content text-white text-center sm:text-left">
            <h1 className="text-[20px] sm:text-[26px] font-medium">
              MindCurePath
            </h1>

            <div className="text-[13px] sm:hidden font-light flex flex-col">
              <p>India's own virtual counselling platform</p>
              <p>built by Indians, for Indians</p>
            </div>
            <p className="hidden sm:block text-[14px] font-light uppercase">
              India's own virtual counselling platform built by Indians, for
              Indians
            </p>
          </div>
        </div>

        <div className="right text-white text-center sm:text-center animate-float-2">
          <h1 className="uppercase mb-[8px] sm:mb-[10px] text-[16px] sm:text-[20px] font-extralight tracking-wide leading-normal">
            Proudly Supports
          </h1>

          <h1 className="uppercase text-[28px] sm:text-[35px] font-bold tracking-wider leading-[28px] sm:leading-[35px]">
            MAKE IN INDIA
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:justify-between gap-[20px] mt-[25px] sm:mt-[30px]">
        <div className="bg-[#45565b] text-white px-[20px] sm:px-[25px] animate-float-1 py-[20px] sm:py-[25px] rounded-[12px] sm:rounded-[15px] shadow-lg flex flex-col gap-[12px] sm:gap-[15px]">
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

        <div className="text-white flex flex-col gap-[15px] sm:gap-[20px] w-full lg:w-auto">
          <div className="bg-[#45565b] px-[18px] sm:px-[20px] py-[18px] animate-float-2 sm:py-[20px] rounded-[10px] shadow-lg w-full lg:min-w-[250px]">
            <p className="text-[14px] sm:text-[16px]">
              Certified Indian Counselors, Therapists, Dieticians
            </p>

            <img src="" alt="" />
          </div>

          <div className="bg-[#45565b] px-[18px] sm:px-[20px] py-[18px] animate-float-2 sm:py-[20px] rounded-[10px] shadow-lg w-full lg:min-w-[250px]">
            <p className="text-[14px] sm:text-[16px]">
              Academic Advisors, Financial Consultants, GST & Taxation Experts
            </p>

            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
