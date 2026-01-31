import React, { useState } from 'react';
const AddHabitModal = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Personal Growth');
    const [difficulty, setDifficulty] = useState('Medium');
    const [icon, setIcon] = useState('✨');
    const [frequency, setFrequency] = useState('Daily');
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({ name, category, difficulty, icon, frequency });
            // Reset
            setName('');
            setCategory('Personal Growth');
            setDifficulty('Medium');
            setIcon('✨');
            onClose();
        }
    };
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="glass-panel" style={{
                width: '100%', maxWidth: '450px',
                padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px',
                background: '#1a1a1a', border: '1px solid var(--border-highlight)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Create New Habit</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Name Input */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Habit Name</label>
                        <input
                            autoFocus
                            type="text"
                            placeholder="e.g. Read 30 Mins"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%', padding: '12px', background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
                                color: 'white'
                            }}
                        />
                    </div>
                    {/* Category Selection */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: '100%', padding: '12px', background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
                                color: 'white'
                            }}
                        >
                            <option value="Health">Health 🍎</option>
                            <option value="Personal Growth">Personal Growth 📚</option>
                            <option value="Mindfulness">Mindfulness 🧘</option>
                            <option value="Productivity">Productivity 🚀</option>
                            <option value="Social">Social 👥</option>
                        </select>
                    </div>

                    {/* Freq, Difficulty, Icon */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Frequency</label>
                            <select
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
                                    color: 'white', fontSize: '13px'
                                }}
                            >
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Difficulty</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
                                    color: 'white', fontSize: '13px'
                                }}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Icon</label>
                            <input
                                type="text"
                                maxLength="2"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
                                    color: 'white', textAlign: 'center'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1, padding: '12px', borderRadius: 'var(--radius-md)',
                                background: 'transparent', border: '1px solid var(--border-subtle)',
                                color: 'var(--text-secondary)', cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: 1, padding: '12px', borderRadius: 'var(--radius-md)',
                                background: 'var(--gradient-purple)', border: 'none',
                                color: 'white', fontWeight: 'bold', cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(217, 70, 239, 0.3)'
                            }}
                        >
                            Create Habit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddHabitModal;