import Lottie from "lottie-react";
import { useState } from "react";
import animationData from '../../lottie/register.json';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
   const {createUser,setUser}=useAuth();

    const handleToSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            setError({ ...error, confirmPassword: "Passwords do not match." });
            return;
        }

        // Password validation
        if (password.length < 6) {
            setError({ ...error, password: "Password must be at least 6 characters." });
            return;
        } else if (!/[A-Z]/.test(password)) {
            setError({ ...error, password: "At least one uppercase letter must be included." });
            return;
        } else if (!/[a-z]/.test(password)) {
            setError({ ...error, password: "At least one lowercase letter must be included." });
            return;
        } else {
            setError({ ...error, password: null });
        }

        // Create user
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Registration successful!`,
                    text: `Welcome, ${name}!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log("User created successfully:", user);
                navigate(location.state ? location.state : "/");
            })
            .catch((err) => {
                console.error("Error during registration:", err);
                setError({ ...error, password: err.code });
            });
    };

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = (e) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <div className="min-h-screen justify-center items-center">
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card py-7 bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                            <h3 className="text-3xl font-bold text-center">Create Your Account</h3>
                            <form onSubmit={handleToSubmit} className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" placeholder="photo URL" name="photoURL" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Blood Group</span>
                                    </label>
                                    <select name="bloodGroup" className="select select-bordered" required>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">District</span>
                                    </label>
                                    <select name="district" className="select select-bordered" required>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Sylhet">Sylhet</option>
                                        <option value="Rajshahi">Rajshahi</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Rangpur">Rangpur</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Upazila</span>
                                    </label>
                                    <select name="upazila" className="select select-bordered" required>
                                        <option value="Upazila 1">Upazila 1</option>
                                        <option value="Upazila 2">Upazila 2</option>
                                        <option value="Upazila 3">Upazila 3</option>
                                    </select>
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="password"
                                        name="password"
                                        className="input input-bordered" required />
                                    <button onClick={togglePassword} className="absolute right-4 top-12 text-xl">
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </button>
                                </div>
                                {
                                    error.password && (
                                        <label className="label">
                                            <span className="label-text text-xs text-red-600">{error.password}</span>
                                        </label>
                                    )
                                }
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="confirm password"
                                        name="confirmPassword"
                                        className="input input-bordered" required />
                                    <button onClick={toggleConfirmPassword} className="absolute right-4 top-12 text-xl">
                                        {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </button>
                                </div>
                                {
                                    error.confirmPassword && (
                                        <label className="label">
                                            <span className="label-text text-xs text-red-600">{error.confirmPassword}</span>
                                        </label>
                                    )
                                }
                                <div className="form-control mt-6 md:col-span-2">
                                    <button className="btn bg-orange-400 text-white text-lg font-semibold w-full">Register</button>
                                </div>
                            </form>
                            <p className="text-gray-400 px-5 text-center flex items-center justify-center">
                                <span className="flex-1 border-t border-gray-300 "></span>
                                <span className="px-4">or</span>
                                <span className="flex-1 border-t border-gray-300 "></span>
                            </p>
                            <p className="text-center font-semibold">Already have an Account ?<Link className="text-red-600" to='/login'>Login</Link></p>
                        </div>
                        <div>
                            <Lottie animationData={animationData} loop={true} autoplay={true} height={480} width={340} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
