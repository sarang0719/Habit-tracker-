import React from 'react';
import { useHabits } from '../../hooks/useHabits';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AnalyticsPage = () => {
    const { habits, getStats } = useHabits();
    const stats = getStats();

    // Mock Trend Data (since we don't have historical data in hook yet)
    const data = {
        labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Today'],
        datasets: [
            {
                label: 'Completion Rate',
                data: [40, 55, 30, 70, 65, 80, stats.completion],
                borderColor: '#D946EF',
                backgroundColor: 'rgba(217, 70, 239, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white' }
            },
            title: {
                display: true,
                text: 'Weekly Performance Trend',
                color: 'white'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#9CA3AF' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#9CA3AF' }
            }
        }
    };

    return (
        <div style={{ padding: '32px', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Analytics Dashboard</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Main Trend Chart */}
                <div className="glass-panel" style={{ padding: '24px', gridColumn: 'span 2', minHeight: '400px' }}>
                    <Line data={data} options={options} />
                </div>

                {/* Stats Cards */}
                <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Total Habits Tracking</h3>
                    <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '16px 0', color: 'var(--accent-secondary)' }}>{habits.length}</p>
                </div>

                <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Current Completion Rate</h3>
                    <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '16px 0', color: 'var(--accent-primary)' }}>{stats.completion}%</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
