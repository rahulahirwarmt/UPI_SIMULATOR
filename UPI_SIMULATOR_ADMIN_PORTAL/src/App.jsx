import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthHandler from './components/AuthHandler';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

import UsersPage from './pages/UsersPage';

const FeaturesPage = () => <div className="text-2xl font-bold p-4">Feature Control Module (Coming Soon)</div>;
const SettingsPage = () => <div className="text-2xl font-bold p-4">Settings Module (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <AuthHandler>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthHandler>
    </Router>
  );
}

export default App;
