import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    CheckSquare,
    BarChart2,
    Bot,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    User,
    Zap
} from 'lucide-react';

import { X } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange, isMobile, isOpen, onClose }) => {
    const { logout, user } = useAuth();

    if (isMobile && !isOpen) return null;

    const mobileStyle = isMobile ? {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 200,
        width: '280px',
        boxShadow: '10px 0 50px rgba(0,0,0,0.5)'
    } : {};

    return (
        <>
            {isMobile && isOpen && (
                <div
                    onClick={onClose}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 190, backdropFilter: 'blur(4px)' }}
                />
            )}
            <aside className="sidebar" style={{
                width: '260px',
                padding: '24px',
                flexShrink: 0,
                justifyContent: 'space-between',
                ...mobileStyle
            }}>
                {isMobile && (
                    <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>
                        <X size={24} />
                    </button>
                )}

                {/* Logo Header */}
                <div>
                    <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            background: 'var(--gradient-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 15px rgba(217, 70, 239, 0.5)',
                            color: 'white'
                        }}>
                            <Zap size={24} fill="white" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px' }}>HabitAI</h3>
                            <p style={{ fontSize: '11px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Pro Tracker</p>
                        </div>
                    </div>

                    {/* Main Menu */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px', paddingLeft: '12px', letterSpacing: '1px' }}>MENU</p>
                        <MenuItem
                            icon={<LayoutDashboard size={20} />}
                            label="Dashboard"
                            active={activeTab === 'dashboard'}
                            onClick={() => onTabChange && onTabChange('dashboard')}
                        />
                        <MenuItem
                            icon={<CheckSquare size={20} />}
                            label="Habits"
                            active={activeTab === 'habits'}
                            onClick={() => onTabChange && onTabChange('habits')}
                        />
                        <MenuItem
                            icon={<BarChart2 size={20} />}
                            label="Analytics"
                            active={activeTab === 'analytics'}
                            onClick={() => onTabChange && onTabChange('analytics')}
                        />
                        <MenuItem
                            icon={<Bot size={20} />}
                            label="AI Coach"
                            active={activeTab === 'ai_coach'}
                            onClick={() => onTabChange && onTabChange('ai_coach')}
                        />
                        <MenuItem
                            icon={<Users size={20} />}
                            label="AI Shadow"
                            active={activeTab === 'ai_shadow'}
                            onClick={() => onTabChange && onTabChange('ai_shadow')}
                        />
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px', paddingLeft: '12px', letterSpacing: '1px' }}>SYSTEM</p>
                        <MenuItem
                            icon={<Settings size={20} />}
                            label="Settings"
                            active={activeTab === 'settings'}
                            onClick={() => onTabChange && onTabChange('settings')}
                        />
                        <MenuItem
                            icon={<HelpCircle size={20} />}
                            label="Help Center"
                            active={activeTab === 'help'}
                            onClick={() => onTabChange && onTabChange('help')}
                        />
                    </div>
                </div>

                {/* Profile Footer */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="glass-panel" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(to right, #333, #444)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-highlight)', overflow: 'hidden' }}>
                            {user?.avatar ? (
                                <img src={user.avatar} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <User size={18} color="#9CA3AF" />
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{user?.name || 'Demo User'}</p>
                            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Free Plan</p>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        style={{
                            width: '100%', padding: '10px', borderRadius: 'var(--radius-md)',
                            background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)',
                            border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

const MenuItem = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: active ? 'linear-gradient(90deg, rgba(217, 70, 239, 0.1) 0%, transparent 100%)' : 'transparent',
            borderLeft: active ? '3px solid var(--accent-primary)' : '3px solid transparent',
            color: active ? 'white' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: active ? '500' : '400',
            transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
            if (!active) {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            }
        }}
        onMouseLeave={(e) => {
            if (!active) {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
            }
        }}
    >
        <span style={{ display: 'flex', alignItems: 'center', filter: active ? 'drop-shadow(0 0 8px var(--accent-primary))' : 'none' }}>{icon}</span>
        {label}
    </div>
);

export default Sidebar;
