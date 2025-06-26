import React from "react";

const Benefits = () => {
  return (
    <div>
      <section
        id="benefits"
        className="py-12 md:py-24 px-10 min-h-[400px] bg-[#1e293b]"
      >
        <h2 className="text-[2.074rem] font-bold mb-8 text-[#60a5fa] text-center tracking-tight">
          Benefits
        </h2>
        <div className="max-w-[1000px] mx-auto">
          <p className="mb-4 text-white">
            Healthcare providers using Clin Technologies solutions report:
          </p>
          <ul className="mb-8 pl-8 list-disc text-white">
            <li className="mb-2">Reduction in documentation time by 40-60%</li>
            <li className="mb-2">
              Improved work-life balance with less after-hours charting
            </li>
            <li className="mb-2">
              Enhanced patient interaction due to less focus on note-taking
            </li>
            <li className="mb-2">
              More comprehensive and consistent clinical documentation
            </li>
            <li className="mb-2">
              Reduced risk of documentation errors and omissions
            </li>
          </ul>
          <div className="flex justify-center gap-5 mt-[30px] md:flex-row flex-col">
            <a
              href="/login"
              className="bg-transparent border-2 border-[#3b82f6] text-white px-8 py-4 rounded-full hover:bg-[rgba(59,130,246,0.1)] transition-colors shadow-[0_5px_15px_rgba(37,99,235,0.2)] inline-block text-center"
            >
              Login
            </a>
            <a
              href="/signUp"
              className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-8 py-4 rounded-full hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.5)] transition-all shadow-[0_5px_15px_rgba(37,99,235,0.4)] relative overflow-hidden z-1 inline-block text-center"
            >
              Signup
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
