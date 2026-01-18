import React from 'react';
import { Activity, CreditCard } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`p-4 rounded-xl ${color}`}><Icon className="h-6 w-6 text-white" /></div>
        <div><p className="text-sm font-medium text-gray-500">{title}</p><h3 className="text-2xl font-bold text-gray-900">{value}</h3></div>
    </div>
);

const Dashboard = () => (
    <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">Operation Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Total Transactions" value="1,240" icon={Activity} color="bg-blue-500" />
            <StatCard title="Pending Verifications" value="12" icon={CreditCard} color="bg-cyan-500" />
        </div>
    </div>
);

export default Dashboard;
