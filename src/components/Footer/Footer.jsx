const Footer = () => {
    return (
        <>
        <div className="w-full">
        <footer className="bg-slate-700 text-white py-8 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Logo and Description */}
                <div className="flex flex-col items-center md:items-start">
                    <img src="https://i.ibb.co.com/h1zKYzZ/1-removebg-preview.png" alt="Blood Bridge Logo" className="h-12 mb-4" />
                    <p className="text-center md:text-left text-sm">Connecting donors with those in need. Your blood donation can save lives. Join us today!</p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold mb-4">Quick Links</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                        <li><a href="/blog" className="hover:underline">Blog</a></li>
                        <li><a href="/donation-requests" className="hover:underline">Donation Requests</a></li>
                        <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact Information and Social Media Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold mb-4">Contact Us</h4>
                    <p className="text-sm mb-2">Phone: +880 123 456 789</p>
                    <p className="text-sm mb-4">Email: support@bloodbridgeapp.com</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4">
                <p className="text-center text-sm">&copy; 2025 Blood Bridge. All rights reserved.</p>
            </div>
        </footer>
        </div>
        </>
    );
};

export default Footer;
