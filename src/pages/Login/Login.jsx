import Swal from "sweetalert2";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import animationData from "../../lottie/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser, forgotPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        signInUser(data.email, data.password)
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
            });
    }

   

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    // Forgot Password functionality
    const handleForgotPassword = () => {
        // Get email from react-hook-form
        const email = getValues("email");
        if (!email) {
            Swal.fire({
                icon: 'warning',
                title: 'Enter Email',
                text: 'Please type your email first before clicking "Forgot password".',
            });
            return;
        }
        // forgot password function calling
        forgotPassword(email)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reset Link Sent',
                    text: 'Check your email inbox or spam folder.',
                    timer: 2500,
                    showConfirmButton: false,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            });
    }

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
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="card-body">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>



                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type={showPassword ? "text" : "password"}  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 16,
                                        pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/
                                    })} placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' &&
                                        <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 16 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase,  one lower case and one number .</p>}
                                    {/* Eye buttons */}
                                    <button
                                        onClick={togglePassword}
                                        className="absolute right-4 top-12 text-xl"
                                    >
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </button>

                                </div>

                                {/* forgot password */}
                                <label className="label">
                                    <Link onClick={handleForgotPassword} className="label-text-alt hover:underline link link-hover text-blue-500">
                                        Forgot password?
                                    </Link>
                                </label>
                                <div className="form-control ">
                                    <button type="submit" value="Log in" className="btn bg-orange-400 text-white text-lg font-semibold w-full">
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
