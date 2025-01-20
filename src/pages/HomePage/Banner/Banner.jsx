import { Link, useNavigate } from "react-router-dom";


const Banner = () => {
  const navigate=useNavigate();
    return (
        <>
          <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://i.ibb.co.com/fGB7yZb/b0dc8f35-3126-4eae-b575-38285553c9a4.jpg)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-xl">
    <h1 className="text-4xl font-bold mb-4">Join Our Mission</h1>
    <div className="flex justify-center gap-4">
    <Link to='/register'>
    <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
        Join as a Donor
    </button>
    </Link>
    <button
        onClick={() => navigate('/search')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Search Donors
    </button>
</div>
    </div>
  </div>
</div>  
        </>
    );
};

export default Banner;


