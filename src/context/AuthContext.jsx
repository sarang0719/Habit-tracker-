import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const mappedUser = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                    email: firebaseUser.email,
                    avatar: firebaseUser.photoURL
                };
                setUser(mappedUser);
                localStorage.setItem('timeflow_active_user', JSON.stringify(mappedUser));
            } else {
                setUser(null);
                localStorage.removeItem('timeflow_active_user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (name, email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // Update display name immediately
        await updateProfile(result.user, {
            displayName: name
        });
        // State update will be handled by onAuthStateChanged
        // But we might want to manually trigger a local update if onAuth is slow, 
        // though usually it's fast enough.
        // We can force a reload of user profile if needed.
    };

    const logout = async () => {
        await signOut(auth);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
