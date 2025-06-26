import React from "react";

const Solutions = () => {
  return (
    <div className="py-12 md:py-24 px-10 min-h-[400px] bg-[#0f172a]">
      <h2 className="text-[2.074rem] font-bold mb-8 text-[#60a5fa] text-center tracking-tight">
        Our Solutions
      </h2>
      <div className="max-w-[1000px] mx-auto text-center mb-8">
        <p className="text-white">
          Our comprehensive suite of AI-powered solutions transforms every
          aspect of healthcare documentation:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1200px] w-full mx-auto">
        <div className="bg-[rgba(30,58,138,0.3)] rounded-xl p-8 border border-[rgba(96,165,250,0.2)] shadow-xl transition-all duration-500 relative overflow-hidden hover:translate-y-[-10px] hover:shadow-2xl border-t-[3px] border-t-[#10b981]">
          <div className="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[rgba(16,185,129,0.1)] mb-5 transition-all duration-300 text-[32px] text-[#10b981] hover:scale-110">
            ✓
          </div>
          <h3 className="text-[1.44rem] font-semibold text-[#60a5fa] mt-0 mb-4">
            Validify
          </h3>
          <p className="text-white">
            Mitigate compliance risk with powerful AI that optimizes chart
            reviews for accuracy, integrity, coding, and compliance. Validify
            automatically identifies documentation gaps, ensures coding
            accuracy, and maintains regulatory compliance.
          </p>
        </div>
        <div className="bg-[rgba(30,58,138,0.3)] rounded-xl p-8 border border-[rgba(96,165,250,0.2)] shadow-xl transition-all duration-500 relative overflow-hidden hover:translate-y-[-10px] hover:shadow-2xl border-t-[3px] border-t-[#f59e0b]">
          <div className="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[rgba(245,158,11,0.1)] mb-5 transition-all duration-300 text-[32px] text-[#f59e0b] hover:scale-110">
            ⊘
          </div>
          <h3 className="text-[1.44rem] font-semibold text-[#60a5fa] mt-0 mb-4">
            Redactify
          </h3>
          <p className="text-white">
            Effortlessly redact HIPAA identifiers from text, documents, and
            structured data with Redactify – automating your compliance
            workflow. Protect sensitive patient information while maintaining
            clinical context.
          </p>
        </div>
        <div className="bg-[rgba(30,58,138,0.3)] rounded-xl p-8 border border-[rgba(96,165,250,0.2)] shadow-xl transition-all duration-500 relative overflow-hidden hover:translate-y-[-10px] hover:shadow-2xl border-t-[3px] border-t-[#3b82f6]">
          <div className="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[rgba(59,130,246,0.1)] mb-5 transition-all duration-300 text-[32px] text-[#3b82f6] hover:scale-110">
            🗣️
          </div>
          <h3 className="text-[1.44rem] font-semibold text-[#60a5fa] mt-0 mb-4">
            TranscriptX
          </h3>
          <p className="text-white">
            Spend less time documenting. TranscriptX dictates highly accurate
            medical transcriptions of patient encounters into text,
            understanding complex medical terminology and clinical context for
            superior accuracy.
          </p>
        </div>
        <div className="bg-[rgba(30,58,138,0.3)] rounded-xl p-8 border border-[rgba(96,165,250,0.2)] shadow-xl transition-all duration-500 relative overflow-hidden hover:translate-y-[-10px] hover:shadow-2xl border-t-[3px] border-t-[#ec4899]">
          <div className="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[rgba(236,72,153,0.1)] mb-5 transition-all duration-300 text-[32px] text-[#ec4899] hover:scale-110">
            📝
          </div>
          <h3 className="text-[1.44rem] font-semibold text-[#60a5fa] mt-0 mb-4">
            Chartwright
          </h3>
          <p className="text-white">
            Your best friend with charting – turn any normal text into a
            high-quality chart, delivered exactly how healthcare professionals
            need it with extensive customization options to match your workflow
            and documentation standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
