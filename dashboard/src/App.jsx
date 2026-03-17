import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Login from './pages/Login';
import { LayoutDashboard, ShoppingCart, LogOut, User } from 'lucide-react';
import { useStore } from './store/store';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { isEditingDashboard, user, logout } = useStore();

  return (
    <BrowserRouter>
      {!user ? (
        // Not logged in — show login page only
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        // Logged in — show app
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
          {/* Sidebar - Hide when editing dashboard */}
          {!isEditingDashboard && (
            <aside className="w-64 bg-white shadow-xl flex flex-col justify-between z-20 shrink-0">
              <div>
                <div className="p-6">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">HalleyX</h1>
                  <p className="text-xs text-gray-500 font-medium tracking-wider uppercase mt-1">Dashboard Builder</p>
                </div>
                <nav className="mt-4 px-4 space-y-2">
                  <NavLink to="/" icon={LayoutDashboard} label="Dashboard" />
                  <NavLink to="/orders" icon={ShoppingCart} label="Orders" />
                </nav>
              </div>

              {/* User info & Logout */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2 mb-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium text-sm gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 h-screen overflow-x-hidden overflow-y-auto bg-gray-50/50">
            <Routes>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      )}
    </BrowserRouter>
  );
}

// Sidebar NavLink component with active styling
const NavLink = ({ to, icon: Icon, label }) => {
  const location = typeof window !== 'undefined' ? window.location : { pathname: '/' };
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </Link>
  );
};

export default App;
