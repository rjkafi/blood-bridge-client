import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const bloodDonationImages = [
    {
      src: 'https://i.ibb.co/Vc4VbVc3/Blood-Donation-Drive-100823.jpg',
      title: 'Blood Donation Drive at City Hospital',
      user: '@blooddonorcommunity',
      description: 'Join us at the City Hospital to help save lives by donating blood.'
    },
    {
      src: 'https://i.ibb.co/jPhvhnML/Blood-Drive-June-2020.png',
      title: 'Community Blood Drive',
      user: '@givinghope',
      description: 'A vital event to support the community through blood donations. Your contribution can make a difference.'
    },
    {
      src: 'https://i.ibb.co/3yk0Z5Ln/school-project-blood-donation-poster-divyascanvas.webp',
      title: 'Blood Donation at Local School',
      user: '@volunteersunite',
      description: 'Students and teachers gather to contribute to saving lives through blood donation.'
    },
    {
      src: 'https://i.ibb.co/whLnk428/2021-07-10-BKFA-Blood-Donation-Campaign-768x864.jpg',
      title: 'Emergency Blood Donation Campaign',
      user: '@lifesavers',
      description: 'Urgent need for blood donors in response to a local emergency. Every drop counts!'
    },
    {
      src: 'https://i.ibb.co/CDMgV4h/Blood-Donation.jpg',
      title: 'Weekend Blood Donation Event',
      user: '@healthforlife',
      description: 'Spend your weekend doing something meaningful by donating blood at the health center.'
    },
    {
      src: 'https://i.ibb.co/mFvJnJRD/image.jpg',
      title: 'Blood Donation for Cancer Patients',
      user: '@cancerawareness',
      description: 'Your blood donation can save lives of cancer patients in need of critical support.'
    },
    {
      src: 'https://i.ibb.co/ccGLD7BX/IMG-20211010-102942-scaled.jpg',
      title: 'Corporate Blood Donation Event',
      user: '@workplaceheroes',
      description: 'Our workplace heroes coming together to donate blood and make a difference.'
    },
    {
      src: 'https://i.ibb.co/MyCj696t/Blood-Donation.jpg',
      title: 'Youth Blood Donation Campaign',
      user: '@youngbloods',
      description: 'A youth-led initiative to spread awareness and encourage blood donation across communities.'
    },
    {
      src: 'https://i.ibb.co/S7GWg8YQ/IMAGE-1.jpg',
      title: 'National Blood Donation Day',
      user: '@nationalhealth',
      description: 'Join the national effort to raise awareness and donate blood for the good of the nation.'
    },
    {
      src: 'https://i.ibb.co/ksYKcj9X/90010690-2949729158383735-4554011453819977728-o.jpg',
      title: 'Emergency Blood Donation Drive',
      user: '@hospitaldonations',
      description: 'Critical situation requires urgent blood donations. Your participation is needed.'
    },
  ];

const Events = () => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleImageClick = (index) => {
      setCurrentIndex(index);
      setOpen(true);
    };
  
    return (
      <div className="min-h-screen  container mx-auto p-5">
        <div
          className="bg-gradient-to-r to-rose-700 from-red-500 text-white text-center py-12 mb-8"
        >
          <h1 className="text-4xl font-bold">Events</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-12">
          {bloodDonationImages.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[320px] skeleton object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-white rounded-lg transition-opacity duration-300 text-center">
                <p className="text-lg font-semibold">{image.title}</p>
                <p className="text-sm p-3">{image.description}</p>
                <p className="text-md font-semibold">{image.user}</p>
              </div>
            </div>
          ))}
        </div>
        {open && (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={bloodDonationImages.map((image) => ({ src: image.src, alt: image.alt }))}
            index={currentIndex}
          />
        )}
      </div>
    );
};

export default Events;