import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = 'http://localhost:5173/login';
    };

    const navItems = [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard },
        { label: 'Merchant Requests', path: '/merchants', icon: ShoppingBag },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 tracking-tight">
                        Sub-Admin
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium">
                        <LogOut className="h-5 w-5" /> Sign Out
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-auto p-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
