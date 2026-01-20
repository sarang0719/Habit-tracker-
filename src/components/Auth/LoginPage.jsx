import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';

const LoginPage = ({ onSwitch }) => {
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
        } catch (err) {
            setError('Google login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Sign in to continue your streak">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {error && (
                    <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px', fontSize: '13px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)',
                            background: 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', fontSize: '13px',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" width="18" alt="G" /> Google
                    </button>
                    <button type="button" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)',
                        background: 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', fontSize: '13px'
                    }}>
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/mac-os.png" width="18" alt="A" /> Apple
                    </button>
                </div>

                <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
                    <div style={{ position: 'absolute', left: 0, top: '50%', width: '100%', height: '1px', background: 'var(--border-subtle)' }}></div>
                    <span style={{ position: 'relative', background: '#0a0a0a', padding: '0 8px', fontSize: '12px', color: 'var(--text-muted)' }}>Or with email</span>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'white', outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'white', outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: '100%', padding: '14px', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
                <span
                    onClick={onSwitch}
                    style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '500' }}
                >
                    Sign Up
                </span>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
