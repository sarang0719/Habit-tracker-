import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// --- 1. Completion Rate (Donut) ---
export const CompletionChart = ({ percentage }) => {
    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [percentage, 100 - percentage],
                backgroundColor: ['#D946EF', 'rgba(255, 255, 255, 0.05)'], // Neon Purple & Faint White
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        cutout: '75%',
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    return (
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            <Doughnut data={data} options={options} />
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{percentage}%</span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Done</span>
            </div>
        </div>
    );
};

// --- 2. Consistency Graph (Line) ---
export const ConsistencyGraph = () => {
    // Mock data for last 7 days consistency
    const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Consistency',
                data: [65, 59, 80, 81, 56, 95, 70], // Dummy Data
                borderColor: '#10B981', // Neon Green
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1F2937',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#9CA3AF', font: { size: 10 } }
            },
            y: {
                display: false,
                min: 0,
                max: 100
            }
        },
        maintainAspectRatio: false
    };

    return <Line data={data} options={options} />;
};

// --- 3. Weekly Activity (Bar) ---
export const WeeklyBarChart = () => {
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Habits',
                data: [3, 5, 2, 8, 4, 6, 7], // Dummy Data
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, '#8B5CF6'); // Violet
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
                    return gradient;
                },
                borderRadius: 4,
                barThickness: 12,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#9CA3AF', font: { size: 10 } }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { display: false }
            }
        },
        maintainAspectRatio: false
    };

    return <Bar data={data} options={options} />;
};
