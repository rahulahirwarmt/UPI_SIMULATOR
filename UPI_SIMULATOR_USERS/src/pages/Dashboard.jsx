import React, { useState } from 'react';
import { Send, ArrowDownLeft, Clock, Wallet, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransactionItem = ({ name, type, amount, date, status }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${type === 'sent' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                {type === 'sent' ? <Send className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
            </div>
            <div>
                <h4 className="font-semibold text-gray-900">{name}</h4>
                <p className="text-sm text-gray-500">{date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`font-bold ${type === 'sent' ? 'text-gray-900' : 'text-green-600'}`}>
                {type === 'sent' ? '-' : '+'}₹{amount}
            </p>
            <span className="text-xs text-gray-400 capitalize">{status}</span>
        </div>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 pt-8 pb-16 rounded-b-[2.5rem] shadow-lg">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold border border-white/30">
                            U
                        </div>
                        <div>
                            <p className="text-purple-100 text-sm">Welcome Back</p>
                            <h2 className="text-white font-bold text-lg">User Name</h2>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>

                {/* Balance Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transform translate-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Wallet className="h-5 w-5" />
                            <span className="font-medium">Total Balance</span>
                        </div>
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">₹24,500<span className="text-xl text-gray-400">.00</span></h1>
                    <p className="text-xs text-gray-400">UPI ID: user@upi</p>
                </div>
            </header>

            {/* Actions */}
            <div className="mt-12 px-6 grid grid-cols-2 gap-4">
                <button className="bg-gray-900 text-white p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-gray-200 active:scale-95 transition-transform">
                    <Send className="h-6 w-6 text-purple-400" />
                    <span className="font-medium text-sm">Send Money</span>
                </button>
                <button className="bg-white text-gray-900 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-sm border border-gray-100 active:scale-95 transition-transform">
                    <ArrowDownLeft className="h-6 w-6 text-blue-500" />
                    <span className="font-medium text-sm">Request</span>
                </button>
            </div>

            {/* Transactions */}
            <div className="mt-8 px-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Recent Transactions</h3>
                    <button className="text-purple-600 text-sm font-semibold">See All</button>
                </div>
                <div className="space-y-3">
                    <TransactionItem name="Starbucks Coffee" type="sent" amount="450" date="Today, 10:23 AM" status="Success" />
                    <TransactionItem name="Rahul (Refund)" type="received" amount="1,200" date="Yesterday" status="Success" />
                    <TransactionItem name="Electricity Bill" type="sent" amount="2,400" date="Jan 15" status="Pending" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
