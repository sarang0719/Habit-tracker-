import React from 'react';

const CalendarWidget = () => {
    // Generate simple current month grid
    const daysInMonth = 31; // Simplified for demo
    const startOffset = 4; // Starts on Thursday/Friday approx
    const today = new Date().getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Mock completion data
    const getStatus = (d) => {
        if (d === today) return 'today';
        if (d > today) return 'future';
        return Math.random() > 0.4 ? 'completed' : 'missed';
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Activity Calendar</h3>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>January 2026</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>{d}</div>
                ))}

                {Array.from({ length: startOffset }).map((_, i) => <div key={`empty-${i}`}></div>)}

                {days.map(d => {
                    const status = getStatus(d);
                    let bg = 'rgba(255,255,255,0.05)';
                    let color = 'var(--text-secondary)';
                    let border = 'transparent';

                    if (status === 'completed') {
                        bg = 'rgba(16, 185, 129, 0.2)';
                        color = 'var(--accent-success)';
                    } else if (status === 'missed') {
                        bg = 'rgba(239, 68, 68, 0.1)';
                    } else if (status === 'today') {
                        border = 'var(--accent-primary)';
                        bg = 'rgba(217, 70, 239, 0.1)';
                        color = 'white';
                    }

                    return (
                        <div key={d} style={{
                            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '6px', fontSize: '12px',
                            background: bg, color: color,
                            border: `1px solid ${border}`,
                            position: 'relative'
                        }}>
                            {d}
                            {status === 'today' && <div style={{ position: 'absolute', bottom: -4, width: 4, height: 4, background: 'var(--accent-primary)', borderRadius: '50%' }}></div>}
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(16, 185, 129, 0.2)' }}></div> Done
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(239, 68, 68, 0.1)' }}></div> Missed
                </div>
            </div>
        </div>
    );
};

export default CalendarWidget;
