import React from "react";

const Contact = () => {
  return (
    <div>
      <section
        id="contact"
        className="py-12 md:py-24 px-10 min-h-[400px] bg-[#1e293b]"
      >
        <h2 className="text-[2.074rem] font-bold mb-8 text-[#60a5fa] text-center tracking-tight">
          Get Started
        </h2>
        <div className="max-w-[1000px] mx-auto">
          <p className="text-center mb-8 text-white">
            Ready to transform your clinical documentation process? Contact our
            team to learn how Clin Technologies can be tailored to your specific
            healthcare setting.
          </p>
          <div className="max-w-[600px] mx-auto bg-[#1e293b] p-8 rounded-xl shadow-lg border border-[rgba(96,165,250,0.2)]">
            <div className="mt-8 text-center">
              <p className="text-[#94a3b8]">
                Or reach us directly via email at{" "}
                <a
                  href="mailto:support@clintechso.com"
                  className="text-[#60a5fa] hover:underline"
                >
                  support@clintechso.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-5 mt-[30px] md:flex-row flex-col">
            <a
              className="bg-transparent border-2 border-[#3b82f6] text-white px-8 py-4 rounded-full hover:bg-[rgba(59,130,246,0.1)] transition-colors shadow-[0_5px_15px_rgba(37,99,235,0.2)] inline-block text-center"
              href="/login"
              data-discover="true"
            >
              Login
            </a>
            <a
              className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-8 py-4 rounded-full hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.5)] transition-all shadow-[0_5px_15px_rgba(37,99,235,0.4)] relative overflow-hidden z-1 inline-block text-center"
              href="/signUp"
              data-discover="true"
            >
              Signup
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
