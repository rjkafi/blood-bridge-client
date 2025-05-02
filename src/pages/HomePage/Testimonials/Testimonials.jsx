import { motion } from "motion/react"

const Testimonials = () => {

    const testimonials = [
        {
            name: "Daniel Clifford",
            status: "Verified Donor",
            message:
                "The donation process was seamless, and the staff made me feel comfortable throughout. I highly recommend donating blood—it’s a small effort that can save lives.",
            image: "https://i.ibb.co/StddXVx/images-4.jpg",
        },
        {
            name: "Jonathan Walters",
            status: "Verified Donor",
            message:
                "Donating blood was an amazing experience. The staff was very supportive, and I felt great knowing I contributed to saving lives.",
            image: "https://i.ibb.co/T2QTf0n/pxfuel.jpg",
        },
        {
            name: "Kira Whittle",
            status: "Verified Donor",
            message:
                "I was nervous about donating, but the team made it super easy! It was truly a life-changing experience, and I plan to do it regularly.",
            image: "https://i.ibb.co/31Zpv0J/fantasy-4022934-1280.jpg",
        },
        {
            name: "Jeanette Harmon",
            status: "Verified Donor",
            message:
                "Such a rewarding experience! It’s amazing how a small action can make such a big impact. Highly recommend everyone to donate.",
            image: "https://i.ibb.co/fYPJk3N/th-7.jpg",
        },
        {
            name: "Patrick Abrams",
            status: "Verified Donor",
            message:
                "The staff was incredibly friendly and professional. The process was smooth, and I was back to my routine in no time.",
            image: "https://i.ibb.co/h93fM45/th-5.jpg",
        },
    ];

    return (
        <>
            <div className="my-8">
                <motion.div
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-base-content">
                        What Our Donors Say
                    </h2>
                    <p className="text-lg text-base-content mt-2">
                        Hear from people who have made a difference by donating blood.
                    </p>
                </motion.div>
            </div>
            <div className="carousel carousel-center container mx-auto dark:bg-gray-900 transition-all p-6">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="carousel-item max-w-md border p-6 rounded-lg shadow-lg mx-3 min-w-[320px] md:min-w-[400px]  dark:bg-gray-800 dark:text-white">
                        <div className="flex flex-col items-center text-center">
                            <div className="avatar">
                                <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={testimonial.image} alt={testimonial.name} />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mt-4">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{testimonial.status}</p>
                            <p className="mt-4">{testimonial.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Testimonials;
