import React from 'react';
import { Mail, MessageCircle, FileQuestion, ExternalLink } from 'lucide-react';

const HelpPage = () => {
    return (
        <div style={{ padding: '32px', height: '100vh', overflowY: 'auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Help Center</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Find answers and support for your journey.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

                {/* Contact Support Card */}
                <div className="glass-panel" style={{ padding: '24px', gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Contact Support</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>We are here to help you 24/7</p>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                        Have a question, feedback, or facing an issue? Reach out to our dedicated support team directly.
                    </p>

                    <a
                        href="mailto:saranbhuvana21@gmail.com"
                        className="btn-primary"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            textDecoration: 'none', background: 'var(--gradient-purple)'
                        }}
                    >
                        <MessageCircle size={18} />
                        saranbhuvana21@gmail.com
                    </a>
                </div>

                {/* FAQ / Documentation Placeholder */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <FileQuestion size={24} color="var(--accent-secondary)" />
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Common Questions</h3>
                    </div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
                        {['How does the AI Shadow work?', 'Is my data private?', 'How to reset my streak?', 'Exporting my data'].map((q, i) => (
                            <li key={i} style={{
                                padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-subtle)', fontSize: '14px',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                            >
                                {q}
                                <ExternalLink size={12} color="var(--text-secondary)" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={{ marginTop: '40px', padding: '24px', borderRadius: '16px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    "This is an awesome website!" - Thank you for being a valued user.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: '#F59E0B' }}>★</span>)}
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
