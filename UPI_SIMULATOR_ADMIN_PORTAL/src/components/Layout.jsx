import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Zap, Settings, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'http://localhost:5173/login';
    };

    const navItems = [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard },
        { label: 'User Management', path: '/users', icon: Users },
        { label: 'Feature Control', path: '/features', icon: Zap },
        { label: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 tracking-tight">
                        UPI Admin
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                    ? 'bg-purple-50 text-purple-700 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 px-8 py-4 flex items-center justify-between md:hidden">
                    <h1 className="font-bold text-gray-800">UPI Admin Board</h1>
                    <button onClick={handleLogout} className="text-gray-500"><LogOut className="h-5 w-5" /></button>
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
