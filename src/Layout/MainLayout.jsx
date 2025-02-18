import { Outlet,useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const MainLayout = () => {
    const location=useLocation();
    const noHeaderFooter=location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <>
           {  noHeaderFooter ||  <Navbar></Navbar>}
           
           <Outlet></Outlet>
          
           {    noHeaderFooter ||   <Footer></Footer>}  
        </>
    );
};

export default MainLayout;