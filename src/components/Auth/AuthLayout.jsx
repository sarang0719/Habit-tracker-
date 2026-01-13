import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute', top: '20%', left: '20%',
                width: '400px', height: '400px',
                background: 'var(--accent-primary)',
                opacity: '0.1', filter: 'blur(100px)', borderRadius: '50%'
            }}></div>
            <div style={{
                position: 'absolute', bottom: '10%', right: '10%',
                width: '300px', height: '300px',
                background: 'var(--accent-secondary)',
                opacity: '0.1', filter: 'blur(80px)', borderRadius: '50%'
            }}></div>

            {/* Auth Card */}
            <div className="glass-panel" style={{
                width: '100%', maxWidth: '420px', padding: '40px',
                display: 'flex', flexDirection: 'column', gap: '24px',
                background: 'rgba(10, 10, 10, 0.6)',
                backdropFilter: 'blur(16px)',
                zIndex: 10
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{subtitle}</p>
                </div>

                {children}

                <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
                    Secure • Encrypted • Private
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
