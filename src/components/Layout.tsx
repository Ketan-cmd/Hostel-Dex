import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Bell, Home, Ticket, Settings, LogOut, Shield, Moon, Sun, User as UserIcon } from 'lucide-react';
import ProfileModal from './ProfileModal';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user, logout } = useAuth();
  const { notifications } = useApp();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const navigation = user?.role === 'admin' ? [
    { name: 'Dashboard', id: 'admin-dashboard', icon: Home },
    { name: 'Tickets', id: 'tickets', icon: Ticket },
  ] : [
    { name: 'Dashboard', id: 'dashboard', icon: Home },
    { name: 'Submit Ticket', id: 'submit-ticket', icon: Ticket },
    { name: 'My Tickets', id: 'my-tickets', icon: Ticket },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent navigation={navigation} currentPage={currentPage} onPageChange={onPageChange} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <SidebarContent navigation={navigation} currentPage={currentPage} onPageChange={onPageChange} />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50 dark:bg-gray-900">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.role === 'admin' ? 'Admin Dashboard' : 'Hostel Dex'}
                </h1>
                <div className="flex items-center space-x-4">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                  
                  {/* Notifications */}
                  <button
                    onClick={() => onPageChange('notifications')}
                    className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                  >
                    <Bell className="h-6 w-6" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                  
                  {/* User Profile */}
                  <button
                    onClick={() => setProfileModalOpen(true)}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      {user?.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    {user?.role === 'admin' && <Shield className="h-5 w-5 text-blue-500" />}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                  </button>
                </div>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
};

const SidebarContent: React.FC<{
  navigation: any[];
  currentPage: string;
  onPageChange: (page: string) => void;
}> = ({ navigation, currentPage, onPageChange }) => {
  const { logout } = useAuth();

  return (
    <>
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-600">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-lg p-2">
            <Home className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-lg font-semibold text-white">Hostel Dex</h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-white dark:bg-gray-800 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={logout}
            className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>
    </>
  );
};

export default Layout;