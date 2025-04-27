import React from 'react';

const AboutUs = () => {
    return (
        <div className=" text-base-content py-12 px-6 md:px-16 lg:px-32">
            <section className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-red-600">About Our Team</h1>
                <p className="text-lg mt-4 max-w-3xl mx-auto">We are dedicated to saving lives by providing a reliable blood donation system that connects donors with those in need.</p>
            </section>
            <section className="relative flex flex-col md:flex-row items-center gap-12 mb-16">
                <div className="md:w-1/2">
                    <img className="w-full rounded-lg shadow-lg" src="https://i.ibb.co/8nPV8V8Z/41959-hd.jpg" alt="Blood Donation" />
                </div>
                <div className="md:w-1/2 space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold text-red-500">Our History</h2>
                        <p className="mt-2 text-lg">Since our founding, we have been committed to ensuring a safe and reliable blood supply for those in need.</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-red-500">Our Mission</h2>
                        <p className="mt-2 text-lg">To save lives by connecting donors with patients in critical need.</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-red-500">Our Impact</h2>
                        <p className="mt-2 text-lg">Thousands of lives saved through community donations and healthcare partnerships.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
