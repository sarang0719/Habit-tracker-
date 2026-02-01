import React from 'react';
import { LayoutDashboard, CheckSquare, BarChart2, Bot, Menu } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange, onMenuClick }) => {
    const navItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Home' },
        { id: 'habits', icon: <CheckSquare size={20} />, label: 'Habits' },
        { id: 'analytics', icon: <BarChart2 size={20} />, label: 'Stats' },
        { id: 'ai_coach', icon: <Bot size={20} />, label: 'Coach' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '65px',
            background: 'rgba(15, 15, 20, 0.85)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 100,
            paddingBottom: 'safe-area-inset-bottom', // Handle iPhone notch/bar
        }}>
            {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '8px',
                            flex: 1,
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{
                            transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            {item.icon}
                        </div>
                        <span style={{
                            fontSize: '10px',
                            fontWeight: isActive ? 600 : 400,
                            opacity: isActive ? 1 : 0.7
                        }}>
                            {item.label}
                        </span>
                    </button>
                );
            })}

            {/* More / Menu Button */}
            <button
                onClick={onMenuClick}
                style={{
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px',
                    flex: 1,
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s ease'
                }}
            >
                <Menu size={20} />
                <span style={{ fontSize: '10px', opacity: 0.7 }}>More</span>
            </button>
        </div>
    );
};

export default BottomNav;
