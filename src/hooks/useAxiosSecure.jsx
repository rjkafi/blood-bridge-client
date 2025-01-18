import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',

});


const useAxiosSecure = () => {
    const navigate=useNavigate();
   const {logOut}=useAuth();
   // request interceptor to add authorization header for every secure call api
   axiosSecure.interceptors.request.use(function(config){
      const token=localStorage.getItem("Access-Token")
      console.log("Request stop by interceptorc",token)
      config.headers.authorization=`Bearer ${token}`;
      return config;
   },function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
)

 // Add a response interceptor
axiosSecure.interceptors.response.use(function (response) {
   // Any status code that lie within the range of 2xx cause this function to trigger
   // Do something with response data
   return response;
 },  async(error)=> {
   const statusCode=error.response.status;
   // console.log("status error in the interceptor", status)
   // for 401 || 403 logout the user and  moved to login page
   if(statusCode === 401 || statusCode === 403){
      await logOut();
    navigate('/login')
   }
   return Promise.reject(error);
 });

 
   return axiosSecure;
};

export default useAxiosSecure;