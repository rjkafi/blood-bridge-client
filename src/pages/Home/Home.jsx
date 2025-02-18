import Banner from "../HomePage/Banner/Banner";
import ContactUs from "../HomePage/ContactUs/ContactUs";
import DonationProcess from "../HomePage/DonationProcess/DonationProcess";
import FAQSection from "../HomePage/FAQSection/FAQSection";
import Featured from "../HomePage/Featured/Featured";
import PartnersSponsors from "../HomePage/PartnersSponsors/PartnersSponsors";
import Testimonials from "../HomePage/Testimonials/Testimonials";



const Home = () => {
    return (
        <div>
         
         <Banner></Banner>
         <div className="container mx-auto">
         <Featured></Featured>
         <DonationProcess></DonationProcess>
         <FAQSection></FAQSection>
         <Testimonials></Testimonials>
         <PartnersSponsors></PartnersSponsors>
         <ContactUs></ContactUs>
         </div>
        </div>
    );
};

export default Home;