import { Bell, Settings, User, ArrowLeft, Activity, LogOut } from 'lucide-react';

const Navigation = ({ onBackToDashboard, currentView, provider, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-gray-900">MedPortal</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 ml-8">
            <button 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentView === 'dashboard' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Settings size={20} />
          </button>
          
          <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              {provider && (
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{provider.name}</p>
                  <p className="text-xs text-gray-500">{provider.specialty}</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;