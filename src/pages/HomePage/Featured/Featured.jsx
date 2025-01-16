import { FaHandHoldingHeart } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { IoManSharp } from "react-icons/io5";
import { MdGroups2, MdHealthAndSafety } from "react-icons/md";
import { TbHelpHexagonFilled } from "react-icons/tb";

const Featured = () => {
    return (
        <>
            <section className="bg-red-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-red-700 uppercase">Our Mission</h2>
                        <h3 className="text-3xl font-bold text-gray-900">How We Help Save Lives</h3>
                        <p className="text-gray-600 mt-4">
                            Join us in our mission to make a difference by donating blood and saving lives. Every drop counts!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="flex items-center justify-center text-red-700 text-4xl mb-4">
                                <FaHandHoldingHeart />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Why Donate Blood?</h4>
                            <p className="text-gray-600">Your blood donation can save lives and make a difference in someone's life.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="flex items-center justify-center text-red-700 text-4xl mb-4">
                                <IoManSharp />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Who Can Donate?</h4>
                            <p className="text-gray-600">Healthy individuals aged 18-65, weighing 50kg or more, can donate blood.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="flex items-center justify-center text-red-700 text-4xl mb-4">
                                <TbHelpHexagonFilled />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">How to Donate?</h4>
                            <p className="text-gray-600">Visit our nearest blood donation center and register to donate blood today.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="flex items-center justify-center text-red-700 text-4xl mb-4">
                                <MdHealthAndSafety />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Health Benefits</h4>
                            <p className="text-gray-600">Blood donation improves cardiovascular health and reduces the risk of heart disease.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="flex items-center justify-center text-red-700 text-4xl mb-4">
                                <GrSchedules />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Donation Schedule</h4>
                            <p className="text-gray-600">Schedule your donation at your convenience. We value your time and contribution.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="flex items-center justify-center text-red-700 text-4xl mb-4">
                                <MdGroups2 />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Join Our Community</h4>
                            <p className="text-gray-600">Become a part of our blood donation community and help us spread awareness.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Featured;
