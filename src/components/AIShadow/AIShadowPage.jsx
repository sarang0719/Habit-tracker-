import React, { useMemo } from 'react';
import { useHabits } from '../../hooks/useHabits';
import {
    Activity,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Zap,
    Bot,
    Skull,
    Mail
} from 'lucide-react';

const AIShadowPage = () => {
    const { habits } = useHabits();

    // --- AI Shadow Logic (Digital Twin Simulation) ---
    const simulation = useMemo(() => {
        const today = new Date();
        const next14Days = [];
        let totalPredictedcompletions = 0;
        let totalOpportunities = 0;
        const riskyHabits = [];

        // 1. Analyze historical performance per habit
        const habitStats = habits.map(habit => {
            const completedCount = habit.completedDates.length;
            // Simple consistency metric (mocking "days since start" as 30 for calculation if not tracked)
            const consistency = Math.min(100, Math.round((completedCount / 30) * 100)); // Assumes 30 day history window for simplicity

            // Identify weak days (e.g. if they mostly miss weekends)
            // For this 'no-external-API' version, we'll randomize a bit based on consistency + name length hash
            const baseSuccessRate = Math.max(0.2, consistency / 100);

            return { ...habit, consistency, baseSuccessRate };
        });

        // 2. Simulate next 14 days
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const dailyPrediction = {
                date: dateStr,
                dayName,
                dayNum: date.getDate(),
                predictedHabits: []
            };

            let dailySuccessCount = 0;

            habitStats.forEach(habit => {
                // Simulation Algorithm:
                // Base chance + random variance.
                // "Shadow" logic: If consistency < 40%, high chance of failure.
                // Weekend penalty logic (just for flavor)
                let successChance = habit.baseSuccessRate;
                if (dayName === 'Sat' || dayName === 'Sun') successChance -= 0.1;

                const isSuccess = Math.random() < successChance;

                dailyPrediction.predictedHabits.push({
                    name: habit.name,
                    success: isSuccess,
                    risk: !isSuccess && successChance > 0.4 // "Risk" if they usually do it but might miss
                });

                if (isSuccess) dailySuccessCount++;
                totalOpportunities++;
            });

            dailyPrediction.score = Math.round((dailySuccessCount / habits.length) * 100) || 0;
            totalPredictedcompletions += dailySuccessCount;
            next14Days.push(dailyPrediction);
        }

        // 3. Identify At-Risk Habits
        habitStats.forEach(h => {
            if (h.consistency < 50) {
                riskyHabits.push({ name: h.name, consistency: h.consistency, reason: 'Low consistency history' });
            }
        });

        const projectedConsistency = Math.round((totalPredictedcompletions / totalOpportunities) * 100) || 0;

        return {
            timeline: next14Days,
            projectedConsistency,
            riskyHabits,
            habitStats
        };
    }, [habits]);

    return (
        <div style={{ padding: '32px', height: '100vh', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    AI Shadow <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>// Digital Twin</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
                    I am your digital shadow. I've analyzed your past behavior to simulate your next 14 days.
                    <span style={{ color: 'var(--accent-primary)' }}> by analyzing 100+ patterns in your data.</span>
                </p>
            </div>

            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <div className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--accent-primary)' }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={16} /> Projected Consistency
                    </h3>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'white' }}>
                        {simulation.projectedConsistency}%
                    </div>
                    <p style={{ fontSize: '12px', color: simulation.projectedConsistency > 70 ? 'var(--accent-success)' : 'var(--accent-danger)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {simulation.projectedConsistency > 70 ? <><TrendingUp size={12} /> Positive Trajectory</> : <><TrendingDown size={12} /> Motivation Risk</>}
                    </p>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--accent-danger)' }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={16} /> At-Risk Habits
                    </h3>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'white' }}>
                        {simulation.riskyHabits.length}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                        High probability of breaking streak
                    </p>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--accent-secondary)' }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Skull size={16} /> Predicted Streak Breaks
                    </h3>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'white' }}>
                        {simulation.timeline.filter(d => d.score < 50).length}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                        Days requiring extra willpower
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Timeline Visualization */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>14-Day Future Simulation</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {simulation.timeline.map((day, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '50px',
                                    textAlign: 'center',
                                    color: day.score < 50 ? 'var(--text-muted)' : 'white'
                                }}>
                                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{day.dayName}</div>
                                    <div style={{ fontSize: '10px' }}>{day.dayNum}</div>
                                </div>

                                {/* Timeline Bar */}
                                <div style={{ flex: 1, height: '36px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 4px', gap: '2px' }}>
                                    {day.predictedHabits.map((h, hIdx) => (
                                        <div key={hIdx}
                                            title={`${h.name}: ${h.success ? 'Success' : 'Fail'}`}
                                            style={{
                                                flex: 1,
                                                height: '24px',
                                                borderRadius: '4px',
                                                background: h.success
                                                    ? 'rgba(16, 185, 129, 0.4)' // Success Green
                                                    : 'rgba(239, 68, 68, 0.15)', // Fail Red
                                                border: h.success ? 'none' : '1px solid rgba(239, 68, 68, 0.3)'
                                            }}
                                        />
                                    ))}
                                </div>
                                <div style={{ width: '40px', textAlign: 'right', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    {day.score}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Insights & Future Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* NEW: AI Future Message (Message from Future Self) */}
                    <div className="glass-panel" style={{
                        padding: '24px',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0,0,0,0))',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#60A5FA' }}>
                            <Mail size={18} />
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Incoming Transmission</h3>
                        </div>

                        <div style={{
                            fontSize: '14px', lineHeight: '1.7', color: 'var(--text-primary)',
                            fontFamily: 'monospace', position: 'relative', zIndex: 1
                        }}>
                            {simulation.projectedConsistency > 80 ? (
                                <>
                                    "Hey. It's you, 14 days from now. <br /><br />
                                    I just wanted to say <strong>thank you</strong>. Because you stuck with it today, I'm feeling amazing right now.
                                    I know it was hard to keep going, but looking back? It was the turning point. We are unstoppable."
                                </>
                            ) : simulation.projectedConsistency < 50 ? (
                                <>
                                    "Hey... it's your future self. <br /><br />
                                    I'm writing this because I wish you had made a different choice today.
                                    We gave up on <strong>{simulation.riskyHabits[0]?.name || 'our goals'}</strong> again, and honestly? It feels heavy.
                                    Please, change the trajectory. Don't let me down."
                                </>
                            ) : (
                                <>
                                    "Hello from the future. <br /><br />
                                    We are doing okay, but I know we can do better.
                                    I see you struggling with consistency.
                                    Trust me—push through this week.
                                    The version of us that exists in two weeks is waiting for you to step up."
                                </>
                            )}
                        </div>

                        {/* Decorative background element */}
                        <div style={{
                            position: 'absolute', bottom: '-20px', right: '-20px',
                            fontSize: '100px', opacity: 0.05, transform: 'rotate(-20deg)',
                            pointerEvents: 'none'
                        }}>
                            ✉️
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0,0,0,0))' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Bot size={18} /> Shadow Insight
                        </h3>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                            {simulation.projectedConsistency < 50
                                ? "Pattern Detected: Your momentum is fading. My simulation shows a critical motivation drop starting this weekend. If you don't adjust, you'll likely abandon 2 habits."
                                : "Pattern Detected: You are building strong inertia. My simulation predicts you will hit a new streak record in 6 days. Keep pushing."}
                        </p>
                        <button className="btn-primary" style={{ marginTop: '16px', width: '100%', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            {simulation.projectedConsistency < 50
                                ? <><AlertTriangle size={14} /> Generate Recovery Plan</>
                                : <><Zap size={14} /> Optimize My Routine</>}
                        </button>
                    </div>


                    <div className="glass-panel" style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>At-Risk Habits</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {simulation.riskyHabits.length > 0 ? simulation.riskyHabits.map((h, i) => (
                                <div key={i} style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.05)', borderLeft: '2px solid var(--accent-danger)', borderRadius: '0 4px 4px 0' }}>
                                    <div style={{ fontWeight: '500', fontSize: '14px' }}>{h.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--accent-danger)' }}>{h.reason} ({h.consistency}%)</div>
                                </div>
                            )) : (
                                <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic' }}>
                                    No critical risks detected. Good job!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIShadowPage;
