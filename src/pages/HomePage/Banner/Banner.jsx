import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <>
          <div className="bg-slate-500  bg-center h-64 flex items-center justify-center text-white" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080)' }}>
            <div className="text-center">
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
        </>
    );
};

export default Banner;