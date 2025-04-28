import React from "react";
import { motion } from "framer-motion";

const PartnersSponsors = () => {
    const partners = [
        { name: "Red Cross", logo: "https://i.ibb.co/tTNNZzNj/th-14.jpg" },
        { name: "WHO", logo: "https://i.ibb.co/5XVhjG8x/th-15.jpg" },
        { name: "UNICEF", logo: "https://i.ibb.co/8gYwyB2w/th-16.jpg" },
        { name: "Blood Bank", logo: "https://i.ibb.co/2051hvWw/th-17.jpg" },
        { name: "Save Lives", logo: "https://i.ibb.co/5gZrHbhZ/th-18.jpg" },
    ];

    return (
        <div className="my-16 px-6 overflow-hidden">
            <motion.div
                transition={{ duration: 0.8, ease: "easeOut" }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-base-content">
                    Our Partners & Sponsors
                </h2>
                <p className="text-lg text-base-content mt-2">
                    We are proud to be supported by these amazing organizations.
                </p>
            </motion.div>

            {/* Marquee Effect Container */}
            <div className="relative mt-8 overflow-hidden whitespace-nowrap">
                <div className="flex space-x-8 animate-marquee">
                    {partners.concat(partners).map((partner, index) => (
                        <div key={index} className="flex-shrink-0">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="w-24 h-24 object-cover mx-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnersSponsors;
