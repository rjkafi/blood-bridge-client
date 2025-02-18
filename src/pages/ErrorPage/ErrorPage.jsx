import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <Helmet>
                <title>Error Page || Blood Bridge</title>
            </Helmet>

            <div className="flex flex-col items-center justify-center min-h-svh text-center p-4">
                <img
                    src="https://i.ibb.co/VpPMxxD8/404-error-with-people-holding-the-numbers.gif"
                    alt="404 Error"
                    className="max-w-[250px] sm:max-w-[260px] md:max-w-[400px]"
                />
                <h3 className="text-3xl sm:text-3xl font-bold  text-gray-800 dark:text-white">
                    Oops!! Page Not Found
                </h3>
                <NavLink
                    to="/"
                    className="mt-2 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-lg font-semibold px-6 py-3 rounded-lg transition-all"
                >
                    <FaArrowLeft /> Go Back Home
                </NavLink>
            </div>
        </>
    );
};

export default ErrorPage;
