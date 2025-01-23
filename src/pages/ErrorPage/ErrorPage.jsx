
import Lottie from 'lottie-react';
import animationData from '../../lottie/error.json';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData, 
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice' 
        },
    };

    return (
        <>
        <div>
            <Helmet>
                <title>Error page || Blood Bridge</title>
            </Helmet>
        </div>
        <div className='py-20'>
            <Lottie options={defaultOptions} height={270} width={270} />
            <h3 className="text-5xl font-bold text-center mt-12">
                Page Not Found
            </h3>
        </div>

        </>
    );
};

export default ErrorPage;