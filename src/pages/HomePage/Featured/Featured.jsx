import { FaHandHoldingHeart } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { IoManSharp } from "react-icons/io5";
import { MdGroups2, MdHealthAndSafety } from "react-icons/md";
import { TbHelpHexagonFilled } from "react-icons/tb";

const Featured = () => {
    return (
        <div > 
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-red-500 uppercase">Our Mission</h2>
                        <h3 className="text-3xl font-bold text-base-content">How We Help Save Lives</h3>
                        <p className="text-base-content mt-4">
                            Join us in our mission to make a difference by donating blood and saving lives. Every drop counts!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card Items */}
                        {[
                            { icon: <FaHandHoldingHeart />, title: "Why Donate Blood?", text: "Your blood donation can save lives and make a difference." },
                            { icon: <IoManSharp />, title: "Who Can Donate?", text: "Healthy individuals aged 18-65, weighing 50kg or more, can donate blood." },
                            { icon: <TbHelpHexagonFilled />, title: "How to Donate?", text: "Visit our nearest blood donation center and register to donate today." },
                            { icon: <MdHealthAndSafety />, title: "Health Benefits", text: "Blood donation improves cardiovascular health and reduces heart disease risk." },
                            { icon: <GrSchedules />, title: "Donation Schedule", text: "Schedule your donation at your convenience. We value your contribution." },
                            { icon: <MdGroups2 />, title: "Join Our Community", text: "Become a part of our blood donation community and help us spread awareness." }
                        ].map((item, idx) => (
                            <div key={idx} className="rounded-lg p-6 text-center bg-base-100 shadow-lg">
                                <div className="flex items-center justify-center text-red-500 text-4xl mb-4">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-semibold text-base-content mb-2">{item.title}</h4>
                                <p className="text-base-content">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Featured;
