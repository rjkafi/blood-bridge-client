import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";



export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();




    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Sign in with email & password
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);

    }
    // signout
    const signOutUser = () => {
        sessionStorage.clear();
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    // Forgot Password
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password reset email sent");
                // You can return a success message here or show a toast
                return  toast.info('Password reset email sent');

            })
            .catch((error) => {
                console.error("Error sending password reset email:", error.message);
                throw new Error(error.message);

            })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // console.log('state captured user:', currentUser?.email)
            if (currentUser) {
                //   get token and store client
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('Access-Token', res.data.token)
                            setLoading(false);
                        }
                    })
            } else {
                //  Remove Token
                localStorage.removeItem('Access-Token')
                setLoading(false);
            }

        })
        return () => {
            unSubscribe()
        }
    }, [axiosPublic])


    const authInfo = {
        user, setUser,
        createUser, signInUser,
        signOutUser, updateUserProfile,forgotPassword,
        loading


    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;