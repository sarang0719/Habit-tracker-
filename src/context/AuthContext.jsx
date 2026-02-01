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

    // Check if we are running effectively "offline" (file protocol or blocked)
    const isLocalMode = window.location.protocol === 'file:';

    useEffect(() => {
        let mounted = true;

        if (isLocalMode) {
            // Local Mode: Check local storage for fake user
            const savedUser = localStorage.getItem('timeflow_mock_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
            return;
        }

        // Online Mode: Listen to Firebase
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!mounted) return;

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

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, [isLocalMode]);

    const mockLogin = (email = 'user@demo.com', name = 'Demo User') => {
        const mockUser = {
            id: 'mock-user-123',
            name: name,
            email: email,
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
        };
        setUser(mockUser);
        localStorage.setItem('timeflow_mock_user', JSON.stringify(mockUser));
        localStorage.setItem('timeflow_active_user', JSON.stringify(mockUser)); // For analytics/other usage
    };

    const login = async (email, password) => {
        if (isLocalMode) {
            console.log("Local Mode: Simulating login");
            mockLogin(email, email.split('@')[0]);
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Firebase login failed:", error);
            // Fallback for demo purposes if firebase fails even in "web" mode (e.g. strict firewall)
            if (error.code === 'auth/network-request-failed') {
                alert("Network blocked. Entering offline demo mode.");
                mockLogin(email);
            } else {
                throw error;
            }
        }
    };

    const signup = async (name, email, password) => {
        if (isLocalMode) {
            console.log("Local Mode: Simulating signup");
            mockLogin(email, name);
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });
        } catch (error) {
            console.error("Firebase signup failed:", error);
            if (error.code === 'auth/network-request-failed') {
                alert("Network blocked. Entering offline demo mode.");
                mockLogin(email, name);
            } else {
                throw error;
            }
        }
    };

    const logout = async () => {
        if (isLocalMode) {
            setUser(null);
            localStorage.removeItem('timeflow_mock_user');
            localStorage.removeItem('timeflow_active_user');
            return;
        }
        await signOut(auth);
    };

    const loginWithGoogle = async () => {
        if (isLocalMode) {
            console.log("Local Mode: Simulating Google login");
            mockLogin('google-user@demo.com', 'Google User');
            return;
        }
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google login failed", error);
            // If popup is blocked or origin is invalid (common in previews), fallback to mock
            if (error.code === 'auth/unauthorized-domain' || error.code === 'auth/network-request-failed' || error.code === 'auth/operation-not-allowed') {
                alert("Google Sign-In not configured for this domain (or running locally). Entering Demo Mode.");
                mockLogin('google-user@demo.com', 'Google User');
            } else {
                throw error;
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
