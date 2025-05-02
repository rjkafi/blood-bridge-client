import React from 'react';
import { motion } from "motion/react"

const FAQSection = () => {
  return (
    <div className="faq-section w-full">
      {/* Section Title and Subtitle */}
      <div className="section-header text-center mb-8">
        <motion.h2 
        transition={{ duration: 0.9, ease: "easeOut" }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold">Frequently Asked Questions</motion.h2>
        <motion.p 
        transition={{ duration: 0.9, ease: "easeInOut" }}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        className=" text-base-content mt-2">
          Get answers to common questions about blood donation and how you can help save lives.
        </motion.p>
      </div>

      {/* FAQ Accordion and Image */}
      <div className="flex flex-col md:flex-row justify-between items-start px-3">
        <div className="accordion w-full md:w-3/4">
          {/* First Accordion Item */}
          <div 
          className="collapse collapse-arrow join-item  border mb-4">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Who can donate blood?
            </div>
            <div className="collapse-content">
              <p>Generally, anyone between the ages of 18 and 65 who is in good health and weighs at least 50kg can donate blood...</p>
            </div>
          </div>
          
          {/* Second Accordion Item */}
          <div className="collapse collapse-arrow join-item  border mb-4">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              Is blood donation safe?
            </div>
            <div className="collapse-content">
              <p>Yes, blood donation is safe. We follow strict safety protocols to ensure the well-being of donors...</p>
            </div>
          </div>

          {/* Third Accordion Item */}
          <div className="collapse collapse-arrow join-item  border mb-4">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              How often can I donate blood?
            </div>
            <div className="collapse-content">
              <p>You can donate whole blood once every 8 weeks, and platelets can be donated every 7 days...</p>
            </div>
          </div>
        </div>

        {/* Right-side Image */}
        <div className="image w-full md:w-1/4 ml-0 md:ml-4 mt-4 md:mt-0">
          <img
            src="https://i.ibb.co/QjDvsbBm/FAQs-amico.png"
            alt="Blood Donation"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
