import React, { useState } from 'react';
import { MessageSquare, Smartphone, Clock, Zap } from 'lucide-react';
import { useHabits } from '../../hooks/useHabits';

const SettingsPage = () => {
    const { habits } = useHabits();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [reminderTime, setReminderTime] = useState('09:00');
    const [generatedSMS, setGeneratedSMS] = useState(null);

    const handleReset = () => {
        if (window.confirm("Are you sure? This will delete all your habits and data!")) {
            localStorage.removeItem('habit_tracker_data');
            window.location.reload();
        }
    };

    const generatePreview = () => {
        let templates = [];

        // 1. Analyze Habit Data
        const riskyHabit = habits.find(h => h.completedDates.length < 3);
        const strongHabit = habits.find(h => h.completedDates.length > 5);
        const anyHabit = habits[0];

        if (habits.length === 0) {
            templates = [
                "🤖 AI COACH: I see you haven't started any habits yet. Today is the perfect day to begin. Add your first habit now!",
                "🔥 MOTIVATION: A journey of a thousand miles begins with a single step. Start tracking today."
            ];
        } else {
            if (riskyHabit) {
                templates.push(`⚠️ ALERT: Your streak for '${riskyHabit.name}' is at risk. 5 minutes today saves the pattern. Do it now!`);
                templates.push(`🤖 SHADOW INSIGHT: My prediction shows you might skip '${riskyHabit.name}' today. Prove me wrong?`);
            }
            if (strongHabit) {
                templates.push(`🔥 ON FIRE: You're crushing '${strongHabit.name}'! Don't stop now. Consistency is your superpower.`);
            }
            if (anyHabit) {
                templates.push(`🚀 REMINDER: Time for '${anyHabit.name}'. You prioritized this for a reason. honor your commitment.`);
            }
        }

        // Fallback if specific conditions met but array empty for some reason
        if (templates.length === 0) {
            templates = ["👋 Hey there! Just a friendly nudge to check your habits today."];
        }

        const randomMsg = templates[Math.floor(Math.random() * templates.length)];

        // Simulate "AI thinking"
        setGeneratedSMS("Analyzing behavior patterns...");

        setTimeout(() => {
            setGeneratedSMS(randomMsg);

            // Trigger Browser Notification as SMS Simulation
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
                new Notification("AI SMS Reminder (Simulated)", {
                    body: randomMsg,
                    icon: '/favicon.ico'
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        new Notification("AI SMS Reminder (Simulated)", {
                            body: randomMsg,
                            icon: '/favicon.ico'
                        });
                    }
                });
            }
        }, 1200);
    };

    return (
        <div style={{ padding: '32px', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Settings</h2>

            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Profile Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Display Name</label>
                        <input defaultValue="User" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Email</label>
                        <input defaultValue="user@example.com" disabled style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.02)', border: 'none', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)' }} />
                    </div>
                </div>
            </div>

            {/* AI SMS Configuration */}
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#a78bfa' }}>
                    <MessageSquare size={20} />
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>AI SMS Reminders</h3>
                </div>

                <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '12px', marginBottom: '20px', fontSize: '13px', color: '#e5e7eb' }}>
                    <strong>Simulation Mode:</strong> SMS gateway integration is supported in production environments.
                    <br />For this demo, we will simulate the experience by sending a <strong>Device Notification</strong> to your screen instead.
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                            <Smartphone size={14} /> Mobile Number
                        </label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: 'var(--radius-sm)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                            <Clock size={14} /> Preferred Time
                        </label>
                        <input
                            type="time"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: 'var(--radius-sm)' }}
                        />
                    </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Message Preview</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Now</span>
                    </div>

                    {generatedSMS ? (
                        <div style={{
                            background: '#2563EB', color: 'white', padding: '12px 16px',
                            borderRadius: '16px 16px 0 16px', maxWidth: '90%', marginLeft: 'auto',
                            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.3)', fontSize: '14px', lineHeight: '1.5'
                        }}>
                            {generatedSMS}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', padding: '10px' }}>
                            Click button below to test...
                        </div>
                    )}
                </div>

                <button
                    onClick={generatePreview}
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                    <Zap size={16} /> Simulate SMS (Send Notification)
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Application Logic</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span>Enable AI Daily Summaries</span>
                    <input type="checkbox" defaultChecked />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                    <span>Dark Mode</span>
                    <input type="checkbox" defaultChecked disabled />
                </div>
            </div>

            {/* AI Configuration - Removed as per user request for "Own AI" (Local) */}
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', border: '1px solid var(--accent-success)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--accent-success)' }}>AI Status: Active (Local)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    Running fully offline. Your data never leaves this device. 🔒
                </p>
            </div>

            <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--accent-danger)' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--accent-danger)', marginBottom: '8px' }}>Danger Zone</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '14px' }}>Irreversible actions.</p>
                <button onClick={handleReset} style={{ background: 'var(--accent-danger)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                    Reset All Data
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
