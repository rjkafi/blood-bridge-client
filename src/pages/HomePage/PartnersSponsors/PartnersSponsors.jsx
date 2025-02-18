const PartnersSponsors = () => {
    const partners = [
        { name: "Red Cross", logo: "https://i.ibb.co/tTNNZzNj/th-14.jpg" },
        { name: "WHO", logo: "https://i.ibb.co/5XVhjG8x/th-15.jpg" },
        { name: "UNICEF", logo: "https://i.ibb.co/8gYwyB2w/th-16.jpg" },
        { name: "Blood Bank", logo: "https://i.ibb.co/2051hvWw/th-17.jpg" },
        { name: "Save Lives", logo: "https://i.ibb.co/5gZrHbhZ/th-18.jpg" },
    ];

    return (
        <div className="my-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-base-content">
                    Our Partners & Sponsors
                </h2>
                <p className="text-lg text-base-content mt-2">
                    We are proud to be supported by these amazing organizations.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center items-center mt-8">
                {partners.map((partner, index) => (
                    <div key={index} className="flex justify-center">
                        <div className="p-4 rounded-lg shadow-md  dark:bg-gray-800 dark:text-white hover:scale-105 transition-transform">
                            <img src={partner.logo} alt={partner.name} className="w-24 h-24 object-cover " />
                            <p className="mt-2 text-center font-semibold">{partner.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnersSponsors;
