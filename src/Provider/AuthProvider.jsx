import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";



export  const AuthContext=createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
      const [user,setUser]=useState(null)
    const [loading, setLoading] = useState(true);




    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
      // Sign in with email & password
      const signInUser= (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }
    // signout
    const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            console.log('state captured user:', currentUser?.email)
        })
        return  ()=> {
            unSubscribe()
        }
    },[])


const authInfo={
    user,setUser,
    createUser,signInUser,
    signOutUser,updateUserProfile


}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;