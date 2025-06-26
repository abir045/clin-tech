import React, { useState } from "react";
import { Tabs, TabItem } from "flowbite-react";

const InAction = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTopTab, setActiveTopTab] = useState("TranscriptX");
  const [activeExample, setActiveExample] = useState(0);

  const exampleTabs = [
    {
      overview:
        "Experience TranscriptX - Effortless, Accurate Medical Transcription",
      title: "Example 1",

      left: `"Okay, this is for... uh... client file, Jane Doe, DOB 05/12/1980... post-discharge from General Hospital... exacerbation of COPD and new Type 2 Diabetes..."`,
      //   left: {
      //     topleft: "Doctor's Dictation",
      //     topRight: "Audio Input",
      //     center: "Doctor's Dictation (Audio Input Simulation)",
      //     des: "Okay, uh, patient is Sarah Chen, DOB 3/22/1978. Seen today, October 26th, 2023. Chief complaint... uh... right knee pain, ongoing for about 3 months, worse with activity, especially stairs. Subjective: Patient describes the pain as a dull ache, located medially. Rates it a 6/10 currently, can go up to 8/10 after exercise. Some morning stiffness, lasts maybe 15 minutes. No significant swelling reported, denies locking or giving way. Uh... tried over-the-counter Ibuprofen with some partial relief. No history of trauma. Otherwise healthy. Objective: Gait is non-antalgic. Right knee exam: No effusion visible. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially. Assessment: Likely medial compartment osteoarthritis of the right knee. Differential includes medial meniscus tear, although less likely given exam findings. Plan: Uh... Obtain bilateral weight-bearing knee X-rays. Recommend continued NSAID use as needed, consider switching to Naproxen. Discussed physical therapy options for strengthening quadriceps and hamstrings. Also discussed... lifestyle modifications, weight management if applicable... oh, patient's BMI is 24, so that's fine. Follow up in 4 weeks with X-ray results to discuss further management, possibly including corticosteroid injection or referral to orthopedics if symptoms persist. End dictation.",
      //   },

      //   right: {
      //     topleft: "TranscriptX Note",
      //     topRight: "AI-Generated Output",
      //     center: "TranscriptX - AI-Generated Note",
      //     des: "Patient: Sarah Chen DOB: 03/22/1978 Date of Service: October 26, 2023 Chief Complaint:Right knee pain x 3 months.Subjective:Patient reports right knee pain ongoing for approximately 3 months, described as a dull ache located medially. Pain worsens with activity, particularly stair climbing. Pain rated 6/10 currently, increasing to 8/10 post-exercise. Reports approximately 15 minutes of morning stiffness. Denies significant swelling, locking, or episodes of giving way. Partial relief noted with over-the-counter Ibuprofen. No history of trauma. Patient is otherwise healthy.Objective:Gait: Non-antalgic. Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. Full range of motion; terminal flexion elicits mild medial discomfort. McMurray's test negative. Lachman test negative. Anterior/Posterior Drawer tests negative (knee stable).BMI: 24Assessment:Medial compartment osteoarthritis, right knee (probable).Rule out medial meniscus tear (less likely). Plan: Order bilateral weight-bearing knee X-rays (AP, lateral, sunrise views).Recommend continued PRN NSAID use (consider trial of Naproxen 500mg BID PRN). Discussed referral for Physical Therapy focusing on quadriceps/hamstring strengthening. Discussed lifestyle modifications.Follow up in 4 weeks to review X-ray results and clinical progress. Consider intra-articular corticosteroid injection or orthopedic referral if symptoms persist or worsen..",
      //   },

      right: `Client: Jane Doe\nDOB: 05/12/1980\nClinical Content & Assessment:\nClient seen post-discharge from General Hospital following COPD and Diabetes diagnosis.`,
    },
    {
      title: "Example 2",
      overview: "Experience TranscriptX - Accurate Nursing Notes",
      left: `"Client, John Smith, DOB 04/10/1970. Discussed medication issues. Trouble remembering doses..."`,
      right: `Client: John Smith\nDOB: 04/10/1970\nAssessment:\nClient struggling with medication adherence. Daily reminders advised.`,
    },
    {
      title: "Example 3",
      overview:
        "Experience TranscriptX - Effortless Accuracy for Your Psych Notes",
      left: `"Talked about food access and transportation. Lives in a food desert. Needs groceries support..."`,
      right: `Assessment:\nClient has limited food access. Referred to community pantry.`,
    },
    {
      title: "Example 4",
      overview:
        "Empower Your Advocacy with TranscriptX - Effortless Case Notes, Enhanced Client Outcomes",
      left: `"Home safe but client isolated. No family nearby. Interested in joining senior center..."`,
      right: `Social:\nClient isolated. Referral to senior center initiated.`,
    },
  ];

  const topTabs = ["TranscriptX", "Chartwright", "Redactify", "Validity"];

  return (
    <section className="bg-[#1e293b] py-12 px-4 text-white">
      <h2 className="text-3xl font-bold text-blue-400 text-center mb-6">
        See Our Solutions in Action
      </h2>

      <div className="max-w-6xl mx-auto bg-slate-800 rounded-md shadow-lg">
        {/* Custom FullWidth Underline Header */}
        <div className="flex border-b border-slate-600">
          {topTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTopTab(tab)}
              className={`w-full text-center py-3 text-sm font-medium transition-all ${
                activeTopTab === tab
                  ? "border-b-2 border-blue-500 text-white "
                  : "text-gray-400 hover:text-white bg-[#0f172a]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Collapse Button */}
        <div
          className="bg-blue-500 text-center py-2 font-medium cursor-pointer hover:bg-blue-600 transition"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible
            ? "Click to collapse comparison"
            : "Click to expand comparison"}
        </div>

        {/* Collapsible Section */}
        {isVisible && (
          <div className=" bg-[#0f172a]">
            {/* Example Tabs */}
            <div className="flex  border-b border-slate-600 ">
              {exampleTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={` w-full text-center py-3  text-sm font-medium ${
                    activeExample === index
                      ? "border-b-2 border-blue-400 text-white bg-[#3b82f6]"
                      : "text-[#2563eb] hover:text-white"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* NEW: Preview Section */}
            <div className="bg-slate-800 border border-slate-600 rounded mb-6 p-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                {exampleTabs[activeExample].title} Overview
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                This example demonstrates how raw dictation is transformed into
                a structured and professional case note using AI assistance.
                Click below to view the full comparison.
              </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-800 border border-slate-600 p-6 rounded">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {exampleTabs[activeExample].title} - Raw Dictation
                </h3>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {exampleTabs[activeExample].left}
                </pre>
              </div>
              <div className="bg-slate-800 border border-slate-600 p-6 rounded">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">
                  {exampleTabs[activeExample].title} - Enhanced Case Note
                </h3>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {exampleTabs[activeExample].right}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InAction;
