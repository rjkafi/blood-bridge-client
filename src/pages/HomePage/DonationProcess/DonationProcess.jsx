
import { motion } from "motion/react"
import { FaRegClipboard, FaTint, FaStethoscope, FaMugHot } from "react-icons/fa";

const steps = [
  {
    icon: <FaRegClipboard className="text-blue-500 text-3xl" />,
    title: "Registration",
    description: "Create your donor profile and complete the registration process.",
    button: "Register Now",
    buttonLink: "/register",
  },
  {
    icon: <FaTint className="text-red-500 text-3xl" />,
    title: "Blood Donation",
    description: "Takes only 8-10 minutes.",
    details: [
      "Sterile equipment",
      "Professional staff",
      "Comfortable environment",
    ],
  },
  {
    icon: <FaStethoscope className="text-green-500 text-3xl" />,
    title: "Health Screening",
    description: "Ensure you are healthy before donation.",
    details: [
      "Blood pressure check",
      "Hemoglobin test",
      "Basic health assessment",
    ],
  },
  {
    icon: <FaMugHot className="text-red-500 text-3xl" />,
    title: "Rest & Refresh",
    description: "Relax after your donation with refreshments.",
    details: [
      "Light refreshments",
      "15-minute rest",
      "Post-donation care",
    ],
  },
];

const DonationProcess = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Donation Process</h2>
          <p className=" max-w-2xl mx-auto">
            Your journey to saving lives starts here
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute hidden lg:block left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2 z-0" />

          <div className="relative z-10 space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.5 }}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.6}}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              >
                {/* Step Card */}
                <div className="w-full lg:w-1/2 flex justify-center ">
                  <div
                    className={`w-full max-w-lg p-6   border-l-4 border-primary shadow-md rounded-lg relative ${
                      index % 2 === 0 ? "lg:mr-8 border" : "lg:ml-8 border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="p-3 rounded-lg bg-gray-100">
                        {step.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold  text-base-content mb-2">
                          {step.title}
                        </h3>
                        <p className="text-base-content mb-4">{step.description}</p>

                        {/* Details list */}
                        {step.details && (
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            {step.details.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            ))}
                          </ul>
                        )}

                        {/* Button */}
                        {step.button && (
                          <a
                            href={step.buttonLink}
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                          >
                            {step.button} →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Number */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white font-bold text-lg">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;
