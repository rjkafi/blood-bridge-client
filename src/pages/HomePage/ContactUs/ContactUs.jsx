import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="bg-base-100" > 
            <section className=" text-base-content py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                            <p className="text-sm mb-2">📞 Phone: +880 123 456 789</p>
                            <p className="text-sm mb-4">📧 Email: support@bloodbridgeapp.com</p>
                            <p className="text-sm">
                                We are here to assist you with any queries or support you may need regarding blood donation. 
                                Don't hesitate to reach out to us.
                            </p>
                            <div className="flex space-x-4 mt-6">
                                <a href="#" className="text-base-content hover:text-red-500 text-2xl">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="text-base-content hover:text-red-500 text-2xl">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="text-base-content hover:text-red-500 text-2xl">
                                    <FaLinkedinIn />
                                </a>
                                <a href="#" className="text-base-content hover:text-red-500 text-2xl">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full p-2 mt-1 rounded bg-base-100 text-base-content border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                        placeholder="Your Name" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full p-2 mt-1 rounded bg-base-100 text-base-content border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                        placeholder="Your Email" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                                    <textarea 
                                        id="message" 
                                        className="w-full p-2 mt-1 rounded bg-base-100 text-base-content border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                        placeholder="Your Message" 
                                        rows="4"
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
