import React from "react";

const About = () => {
  return (
    <div className="bg-[#1e293b] py-12 md:py-24 px-10 min-h-[400px]">
      <h2 className="text-[2.074rem] font-bold mb-8 text-[#60a5fa] text-center tracking-tight">
        About Clin Technologies
      </h2>
      <div className="max-w-[1000px] mx-auto leading-[1.7] text-white">
        <p>
          Headquartered in the Midwest, Clin Technologies is a{" "}
          <strong>specialized AI firm</strong> that empowers healthcare
          providers across the Midwest and beyond to conquer their most pressing
          operational challenges. We deliver this through a powerful and
          flexible AI platform that powers both a{" "}
          <strong>suite of ready-to-deploy solutions</strong> for documentation
          and compliance, and the creation of{" "}
          <strong>fully bespoke engines</strong> for enterprise-level
          transformation.
        </p>
        <p>
          Our expertise lies in applying cutting-edge{" "}
          <strong>
            Large Language Models (LLMs) and machine learning (ML)
          </strong>{" "}
          to solve real-world challenges in healthcare documentation. We partner
          closely with individual practitioners, clinics, and healthcare
          organizations, leveraging{" "}
          <strong>meticulously gathered real-world data</strong> from
          professionals to build the exceptionally robust and uniquely effective
          datasets that power these advanced systems.
        </p>
        <p>
          This same proven AI framework serves as the foundation for our
          enterprise partnerships. Whether you need an{" "}
          <strong>immediate solution from our product suite</strong> or a{" "}
          <strong>strategic partner to build a custom engine</strong> for
          challenges like Utilization Management, we provide the right tool for
          the job. Our mission is to transform your data into a proprietary
          asset, enabling data-driven decisions that{" "}
          <strong>eliminate administrative friction</strong> and allow you to
          focus on what matters most.
        </p>
      </div>
    </div>
  );
};

export default About;
