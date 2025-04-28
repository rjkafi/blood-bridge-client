import districts from '../../json/districts.json';
import upazilas from '../../json/upazilas.json';

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from '../../lottie/register.json';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({});

    const { user } = useAuth();

    useEffect(() => {
        if (district) {
            // Filter Upazilas based on selected District
            const filtered = upazilas.filter((upazila) => upazila.district_id === districts.find(d => d.name === district)?.id);
            setFilteredUpazilas(filtered);
            setUpazila(''); // Reset Upazila selection
        } else {
            setFilteredUpazilas([]); 
        }
    }, [district]);

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = (e) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            setError({ ...error, confirmPassword: "Passwords do not match." });
            return;
        }

        // Password validation
        if (data.password.length < 6) {
            setError({ ...error, password: "Password must be at least 6 characters." });
            return;
        } else if (!/[A-Z]/.test(data.password)) {
            setError({ ...error, password: "At least one uppercase letter must be included." });
            return;
        } else if (!/[a-z]/.test(data.password)) {
            setError({ ...error, password: "At least one lowercase letter must be included." });
            return;
        } else {
            setError({ ...error, password: null });
        }

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.data;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(async () => {
                        // Prepare image file for upload
                        const imageFile = { image: data.image[0] };

                        // Image upload to imgbb
                        const res = await axiosPublic.post(image_hosting_api, imageFile, {
                            headers: {
                                "content-type": "multipart/form-data",
                            },
                        });
                        if (res.data.success) {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                image: res.data.data.display_url,
                                bloodGroup: data.bloodGroup,
                                district: data.district,
                                upazila: data.upazila,
                                status: 'Active',
                                role: 'donor'
                            };

                            axiosPublic.post('/users', userInfo)
                                .then(async (res) => {
                                    if (res.data.insertedId) {
                                        const getUser = await axiosPublic.get(`/user/${data.email}`);
                                        const user = getUser.data;

                                        // Store email and role in sessionStorage
                                        sessionStorage.setItem('userEmail', user.email);
                                        sessionStorage.setItem('userRole', user.role);

                                        reset();
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'User created successfully.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate('/');
                                    }
                                });
                        }

                    })
                    .catch(error => console.log(error));
            });
    };

    return (
        <>
            <Helmet>
                <title>Blood-Bridge || SignUp</title>
            </Helmet>
            <div className="min-h-screen justify-center items-center">
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card py-4 bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                            <h3 className="md:text-3xl text-2xl font-bold text-center">Create Your Account</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input name="name" type="text" placeholder="name" className="input input-bordered" required {...register("name", { required: true })} />
                                    {errors.name && <span className="text-red-600 text-xs">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className=" text-sm font-medium text-gray-700">Image</label>
                                    <input
                                        type="file"
                                        {...register('image', { required: true })}
                                        className="input input-bordered py-2 mt-4"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name="email" className="input input-bordered" required {...register("email", { required: true })} />
                                    {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Blood Group</span>
                                    </label>
                                    <select name="bloodGroup" className="select select-bordered" required {...register("bloodGroup", { required: true })}>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                    {errors.bloodGroup && <span className="text-red-600 text-xs">Blood Group is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">District</span>
                                    </label>
                                    <select
                                        onChange={(e) => setDistrict(e.target.value)}
                                        name="district"
                                        className="select select-bordered"
                                        required
                                        {...register("district", { required: true })}
                                    >
                                        <option value="">Select District</option>
                                        {districts.map(d => (
                                            <option key={d.id} value={d.name}>{d.name}</option>
                                        ))}
                                    </select>
                                    {errors.district && <span className="text-red-600 text-xs">District is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Upazila</span>
                                    </label>
                                    <select
                                        onChange={(e) => setUpazila(e.target.value)}
                                        name="upazila"
                                        className="select select-bordered"
                                        required
                                        {...register("upazila")}
                                        // {...register("upazila", { required: true })}
                                    >
                                        <option value="">Select Upazila</option>
                                        {filteredUpazilas.length > 0 ? (
                                            filteredUpazilas.map(u => (
                                                <option key={u.id} value={u.name}>{u.name}</option>
                                            ))
                                        ) : (
                                            <option>No Upazilas available</option>
                                        )}
                                    </select>
                                    {errors.upazila && <span className="text-red-600 text-xs">Upazila is required</span>}
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="password"
                                        name="password"
                                        className="input input-bordered" required {...register("password", { required: true })} />
                                    <button onClick={togglePassword} className="absolute right-4 top-12 text-xl">
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </button>
                                    {errors.password && <span className="text-red-600 text-xs">Password is required</span>}
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
                                        className="input input-bordered" required {...register("confirmPassword", { required: true })} />
                                    <button onClick={toggleConfirmPassword} className="absolute right-4 top-12 text-xl">
                                        {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </button>
                                    {errors.confirmPassword && <span className="text-red-600 text-xs">Confirm Password is required</span>}
                                </div>
                                {
                                    error.confirmPassword && (
                                        <label className="label">
                                            <span className="label-text text-xs text-red-600">{error.confirmPassword}</span>
                                        </label>
                                    )
                                }
                                <div className="form-control mt-4 md:col-span-2">
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
