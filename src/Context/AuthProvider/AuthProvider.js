import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import app from '../../Firebase/Firebase.init';


export const AuthContext = createContext();
const auth = getAuth(app);
export default function AuthProvider({children}) {
    
    const [loading, setLoading] = useState(true);
    const [user, setUser]= useState(null);

    const googleProvider = new GoogleAuthProvider();
    
    const createUser =(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login =(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut =()=>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUser=(userInfo)=>{
        return updateProfile(auth.currentUser, userInfo)
    }
    const googleLogin =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            unsubcribe()
        }
    }, [])
    const authInfo ={
        createUser,
        user,
        setLoading,
        loading,
        googleLogin,
        login,
        logOut, updateUser,
        setUser
    };
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}
