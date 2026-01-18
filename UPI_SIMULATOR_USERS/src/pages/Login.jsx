import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, Loader } from 'lucide-react';
import api from '../api/axios';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Determine if identifier is email or username
            const payload = identifier.includes('@')
                ? { email: identifier, password }
                : { username: identifier, password };

            const response = await api.post('/auth/login', payload);
            const { access_token, refresh_token, role } = response.data; // Adjust based on actual API response structure if nested

            // Store tokens
            localStorage.setItem('token', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            localStorage.setItem('role', role);

            // Unified Login: Redirect based on role
            switch (role) {
                case 'admin':
                    // Redirect to Admin Portal (port 5173 -> usually 5174 or different port if running locally)
                    // For now assuming we run them on different ports.
                    // Let's assume Admin is on port 3001 (or 5174). I'll use a placeholder.
                    window.location.href = `http://localhost:5174/?token=${access_token}`;
                    break;
                case 'sub_admin':
                    window.location.href = `http://localhost:5175/?token=${access_token}`;
                    break;
                case 'user':
                default:
                    navigate('/dashboard'); // Stay in this app
                    break;
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-300">Sign in to access the UPI Simulator</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Email or Username"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-500"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader className="h-5 w-5 animate-spin" /> : <>Sign In <ArrowRight className="h-5 w-5" /></>}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">Don't have an account? <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Contact Admin</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
