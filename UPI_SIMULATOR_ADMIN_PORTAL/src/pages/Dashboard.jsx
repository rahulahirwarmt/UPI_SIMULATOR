import React, { useEffect, useState } from 'react';
import { Users, Activity, Server, AlertCircle } from 'lucide-react';
import api from '../api/axios';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
        <div className={`p-4 rounded-xl ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, activeFeatures: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/');
                setStats(response.data);
            } catch (err) {
                console.error("Failed to fetch stats", err);
                // Fallback or error state
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-500 mt-2">Welcome back, Administrator.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={loading ? "..." : stats.totalUsers || 12}
                    icon={Users}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Active Features"
                    value={loading ? "..." : stats.features || 5}
                    icon={Activity}
                    color="bg-blue-500"
                />
                <StatCard
                    title="System Status"
                    value="Healthy"
                    icon={Server}
                    color="bg-green-500"
                />
                <StatCard
                    title="Pending Alerts"
                    value="0"
                    icon={AlertCircle}
                    color="bg-orange-500"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-64 flex items-center justify-center text-gray-400">
                <p>Activity Graph Placeholder</p>
            </div>
        </div>
    );
};

export default Dashboard;
