import React, { useState, useEffect } from 'react';
import { useHabits } from '../../hooks/useHabits';
import { CompletionChart, WeeklyBarChart } from './HabitWidgets';
import { analyzeHabits } from '../../services/localAIService';
import AddHabitModal from '../Habits/AddHabitModal';
import CalendarWidget from './CalendarWidget';
import Timer from '../Timer/Timer';
import {
    Trophy,
    Calendar,
    Zap,
    Bot,
    Plus,
    Check,
    X,
    RefreshCw
} from 'lucide-react';

const Dashboard = () => {
    const { habits, addHabit, toggleHabit, deleteHabit, getStats } = useHabits();
    const stats = getStats();
    const [aiMessage, setAiMessage] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setAiMessage(analyzeHabits(habits));
    }, [habits]);

    const handleAddHabit = (habitData) => {
        addHabit(habitData);
    };

    const handleRefreshAI = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setAiMessage(analyzeHabits(habits));
            setIsRefreshing(false);
        }, 800);
    };

    // XP / Gamification Mock
    const xp = habits.reduce((acc, h) => acc + (h.completedDates.length * 10), 0);
    const level = Math.floor(xp / 100) + 1;
    const nextLevelXp = level * 100;
    const xpProgress = (xp % 100);

    const today = new Date().toISOString().split('T')[0];

    return (
        <div style={{ padding: '32px', height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>

            <AddHabitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddHabit}
            />

            {/* 1. Header Section */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Welcome Back, Champion! <Trophy size={28} color="#F59E0B" />
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Let's crush your goals today.</p>
                        <div style={{ height: '4px', width: '4px', borderRadius: '50%', background: 'var(--text-muted)' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-secondary)' }}>Level {level}</span>
                            <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{ width: `${xpProgress}%`, height: '100%', background: 'var(--gradient-purple)' }}></div>
                            </div>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{xp}/{nextLevelXp} XP</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Calendar size={16} color="var(--text-secondary)" />
                        <span style={{ fontSize: '14px' }}>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--accent-success)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-success)' }}></div>
                        <span style={{ fontSize: '12px', color: 'var(--accent-success)', fontWeight: '600' }}>AI Active</span>
                    </div>

                    <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={16} /> New Habit
                    </button>
                </div>
            </header>

            {/* 2. Main Dashboard Widgets */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {/* Timer Widget */}
                <div style={{ gridColumn: 'span 1' }}>
                    <Timer />
                </div>

                {/* Card 1: Completion Rate */}
                <div className="glass-panel" style={{ gridColumn: 'span 1', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px', alignSelf: 'flex-start' }}>Daily Success</h3>
                    <CompletionChart percentage={stats.completion} />
                </div>

                {/* Card 3: Weekly Activity */}
                <div className="glass-panel" style={{ gridColumn: 'span 2', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Weekly Progress</h3>
                    <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                        <WeeklyBarChart />
                    </div>
                </div>
            </section>

            {/* 3. Task Manager, Calendar & AI Coach */}
            <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px', flex: 1 }}>

                {/* Left: Task / Habit Manager */}
                <div className="glass-panel" style={{ padding: '24px', gridColumn: 'span 1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Your Habits</h3>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stats.completedCount}/{stats.total} Completed</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>
                        {habits.length === 0 ? (
                            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                No habits added yet. Start by creating one!
                            </div>
                        ) : habits.map(habit => {
                            const isCompleted = habit.completedDates.includes(today);
                            return (
                                <div key={habit.id} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '16px', background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                                    borderRadius: 'var(--radius-md)', border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-subtle)'}`,
                                    transition: 'all 0.2s'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div
                                            onClick={() => toggleHabit(habit.id)}
                                            style={{
                                                width: '24px', height: '24px', borderRadius: '6px',
                                                border: `2px solid ${isCompleted ? 'var(--accent-success)' : 'var(--text-secondary)'}`,
                                                background: isCompleted ? 'var(--accent-success)' : 'transparent',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', color: 'black', fontSize: '14px'
                                            }}
                                        >
                                            {isCompleted && <Check size={16} color="black" strokeWidth={3} />}
                                        </div>
                                        <div>
                                            <h4 style={{
                                                fontSize: '15px',
                                                textDecoration: isCompleted ? 'line-through' : 'none',
                                                color: isCompleted ? 'var(--text-muted)' : 'white'
                                            }}>{habit.name}</h4>
                                            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{habit.category}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Zap size={10} color="#F59E0B" fill="#F59E0B" /> {habit.completedDates.length}
                                        </span>
                                        <button
                                            onClick={() => deleteHabit(habit.id)}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Middle: Calendar Widget */}
                <div style={{ gridColumn: 'span 1' }}>
                    <CalendarWidget />
                </div>

                {/* Right: AI Coach Panel */}
                <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(180deg, rgba(217, 70, 239, 0.05) 0%, rgba(25, 26, 30, 0.4) 100%)', border: '1px solid rgba(217, 70, 239, 0.2)', display: 'flex', flexDirection: 'column', gridColumn: 'span 1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px var(--accent-primary)', color: 'white' }}>
                            <Bot size={20} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--accent-primary)' }}>AI Coach</h3>
                    </div>

                    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', flex: 1 }}>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                            "{aiMessage}"
                        </p>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                        <h4 style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Quick Actions</h4>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button onClick={() => addHabit('Stretch 5m', 'Health')} style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border-subtle)', background: 'transparent', fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer' }}>+ Stretch</button>
                        </div>
                    </div>

                    <button
                        onClick={handleRefreshAI}
                        style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', marginTop: '24px', opacity: isRefreshing ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        {isRefreshing ? 'Thinking...' : <><RefreshCw size={14} /> Refresh Insights</>}
                    </button>
                </div>

            </section>
        </div>
    );
};

export default Dashboard;
