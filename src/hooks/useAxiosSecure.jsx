import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://blood-bridge-server-steel.vercel.app',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    // Request interceptor to add authorization header for every secure call API
    axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('Access-Token');
      if (token) {
          config.headers.authorization = `Bearer ${token}`;
      }
      return config;
  }, function (error) {
      return Promise.reject(error);
  });
  

    // Response interceptor for handling 401 and 403 status
    useEffect(() => {
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    await signOutUser();
                    navigate('/login'); 
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, signOutUser]);

    return axiosSecure;
};

export default useAxiosSecure;
