import Swal from "sweetalert2"; 
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import animationData from "../../lottie/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [email, setEmail] = useState("");
    const {signInUser}=useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic=useAxiosPublic();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(async (result) => {
                const user = result.user;
                console.log(user)
                sessionStorage.setItem('userEmail', user.email);

                const res = await axiosPublic.get(`/user/${user.email}`);
                sessionStorage.setItem('userRole', res.data.role);

                Swal.fire({
                    title: "Welcome Back!",
                    text: `Hello, ${user.displayName || "User"}! You are now logged in.`,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate(location.state ? location.state : "/");
            })
            .catch(() => {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid email or password. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                setError({ ...error, login: "Invalid email/password" });
            });
    };

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="hero bg-base-100 min-h-screen">
                    <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                        <div>
                            <Lottie animationData={animationData} loop={true} autoplay={true} height={400} width={310} />
                        </div>
                        <div className="card py-7 bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                            <h3 className="text-3xl font-bold text-center">Welcome Back!</h3>
                            <form onSubmit={handleSubmit} className="px-8">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="password"
                                        name="password"
                                        className="input input-bordered"
                                        required
                                    />
                                    <button
                                        onClick={togglePassword}
                                        className="absolute right-4 top-12 text-xl"
                                    >
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </button>
                                    <label className="label">
                                        <Link className="label-text-alt link link-hover text-blue-500">
                                            Forgot password?
                                        </Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6 mb-3">
                                    <button className="btn bg-orange-400 text-white text-lg font-semibold w-full">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="text-center font-semibold">
                                Don't have an Account?{" "}
                                <Link className="text-red-600" to="/register">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
};

export default Login;
