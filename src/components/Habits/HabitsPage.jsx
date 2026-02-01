import React, { useState } from 'react';
import { useHabits } from '../../hooks/useHabits';
import AddHabitModal from './AddHabitModal';
import { Trash2, Plus, Sparkles, ClipboardList } from 'lucide-react';

import useMobile from '../../hooks/useMobile';

const HabitsPage = () => {
    const { habits, addHabit, toggleHabit, deleteHabit } = useHabits();
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const isMobile = useMobile();

    const handleAddHabit = (habitData) => {
        addHabit(habitData);
    };

    const getStreak = (dates) => {
        if (!dates || dates.length === 0) return 0;
        return dates.length; // Simplified streak
    };

    return (
        <div style={{ padding: isMobile ? '16px' : '32px', height: '100%', overflowY: 'auto' }}>
            <AddHabitModal
                isOpen={isAppModalOpen}
                onClose={() => setIsAppModalOpen(false)}
                onAdd={handleAddHabit}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Habit Management</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Track, manage, and optimize your daily routines.</p>
                </div>
                <button
                    onClick={() => setIsAppModalOpen(true)}
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Plus size={16} /> New Habit
                </button>
            </div>

            {/* Habits List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {habits.map(habit => (
                    <div key={habit.id} className="glass-panel" style={{ padding: '24px', position: 'relative', transition: 'all 0.2s', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.05)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', color: 'white'
                                }}>
                                    {habit.icon ? <span style={{ fontSize: '20px' }}>{habit.icon}</span> : <Sparkles size={20} />}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '2px' }}>{habit.name}</h3>
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{habit.category}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <span style={{
                                    fontSize: '10px', padding: '4px 8px', borderRadius: '20px',
                                    background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-secondary)',
                                    border: '1px solid rgba(139, 92, 246, 0.2)'
                                }}>
                                    {habit.difficulty || 'Medium'}
                                </span>
                                <span style={{
                                    fontSize: '10px', padding: '4px 8px', borderRadius: '20px',
                                    background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)'
                                }}>
                                    {habit.frequency || 'Daily'}
                                </span>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                <strong style={{ color: 'white' }}>{getStreak(habit.completedDates)}</strong> completions
                            </div>
                            <button
                                onClick={() => deleteHabit(habit.id)}
                                style={{
                                    background: 'transparent', border: 'none', color: 'var(--text-muted)',
                                    cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px',
                                    padding: '6px 10px', borderRadius: '6px'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {habits.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', opacity: 0.5 }}>
                        <ClipboardList size={48} />
                    </div>
                    <p>No habits found yet.</p>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>Create your first habit to start tracking!</p>
                </div>
            )}
        </div>
    );
};

export default HabitsPage;
