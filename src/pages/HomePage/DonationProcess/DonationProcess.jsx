import React from 'react';

const DonationProcess = () => {
  return (
    <div className="donation-process mb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-base-content">How the Donation Process Works</h2>
        <p className="text-xl text-base-content mt-4">A simple and safe step-by-step guide to help you donate blood and save lives.</p>
      </div>
      
      <div className="steps-container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {/* Step 1 */}
        <div className="step-card p-6 rounded-lg shadow-lg bg-base-100 dark:bg-gray-800">
          <div className="step-number bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-6">
            1
          </div>
          <h3 className="text-2xl font-semibold text-base-content dark:text-white">Register Online</h3>
          <p className="text-base-content mt-2 dark:text-gray-300">Fill out a quick registration form to schedule your donation appointment.</p>
        </div>

        {/* Step 2 */}
        <div className="step-card p-6 rounded-lg shadow-lg bg-base-100 dark:bg-gray-800">
          <div className="step-number bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-6">
            2
          </div>
          <h3 className="text-2xl font-semibold text-base-content dark:text-white">Visit a Donation Center</h3>
          <p className="text-base-content mt-2 dark:text-gray-300">Head to your nearest donation center on your scheduled date and time.</p>
        </div>

        {/* Step 3 */}
        <div className="step-card p-6 rounded-lg shadow-lg bg-base-100 dark:bg-gray-800">
          <div className="step-number bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-6">
            3
          </div>
          <h3 className="text-2xl font-semibold text-base-content dark:text-white">Donation Process</h3>
          <p className="text-base-content mt-2 dark:text-gray-300">Relax as the trained medical staff carefully and safely collect your blood.</p>
        </div>

        {/* Step 4 */}
        <div className="step-card p-6 rounded-lg shadow-lg bg-base-100 dark:bg-gray-800">
          <div className="step-number bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-6">
            4
          </div>
          <h3 className="text-2xl font-semibold text-base-content dark:text-white">Post-Donation Care</h3>
          <p className="text-base-content mt-2 dark:text-gray-300">Enjoy a healthy snack and drink to help you recover after your donation.</p>
        </div>

        {/* Step 5 */}
        <div className="step-card p-6 rounded-lg shadow-lg bg-base-100 dark:bg-gray-800">
          <div className="step-number bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-6">
            5
          </div>
          <h3 className="text-2xl font-semibold text-base-content dark:text-white">Thank You!</h3>
          <p className="text-base-content mt-2 dark:text-gray-300">You're a hero! Your donation helps save lives.</p>
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
