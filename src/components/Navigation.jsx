import {
  Bell,
  Settings,
  User,
  ArrowLeft,
  Activity,
  LogOut,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../supabase/auth";

const Navigation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [provider, setProvider] = useState({
    id: "provider-1",
    name: "Dr. John Doe",
    specialty: "Cardiology",
  });

  useEffect(() => {
    // Get provider information from database based on current user
    const fetchProviderData = async () => {
      try {
        // If we have a user from Redux store, get their provider details
        if (user?.id) {
          // You can use DataServices.getProviderById(user.id) here
          // For now, using mock data but structure is ready for real data
          const providerData = {
            id: user.id,
            name: user.user_metadata?.name || "Dr. User",
            specialty: "General Practice", // This would come from database
          };
          setProvider(providerData);
        } else {
          // Fallback to mock data if no user in store
          const mockProvider = {
            id: "provider-2",
            name: "Dr. Doe",
            specialty: "Cardiology",
          };
          setProvider(mockProvider);
        }
      } catch (error) {
        console.error('Error fetching provider data:', error);
        // Use fallback data on error
        const fallbackProvider = {
          id: "provider-1",
          name: "Dr. Unknown",
          specialty: "General Practice",
        };
        setProvider(fallbackProvider);
      }
    };

    fetchProviderData();
  }, [user]); // Re-run when user changes

  const { patientId } = useParams();

  const [onBackToDashboard, setOnBackToDashboard] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const navigate = useNavigate();


  useEffect(() => {
    if (patientId) {
      setOnBackToDashboard(true);
      setCurrentView("patient-portal");
    }
  }, [patientId]);

  const handleBackToDashboard = () => {
    setOnBackToDashboard(false);
    setCurrentView("dashboard");
    navigate("/dashboard");
  };

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple logout attempts
    
    setIsLoggingOut(true);
    
    try {
      // Logout from Supabase
      const result = await authService.logoutService();
      
      if (result) {
        // Clear Redux store
        dispatch(logout());
        
        // Clear any local storage if needed
        localStorage.removeItem('user');
        localStorage.removeItem('provider');
        localStorage.removeItem('auth-token');
        
        // Navigate to login page
        navigate('/login');
        
        console.log('User logged out successfully');
      } else {
        throw new Error('Failed to logout from Supabase');
      }
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if Supabase logout fails, clear local state
      dispatch(logout());
      localStorage.removeItem('user');
      localStorage.removeItem('provider');
      localStorage.removeItem('auth-token');
      
      // Still navigate to login
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          {onBackToDashboard && (
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              MedPortal
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6 ml-8">
            <button
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "dashboard"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button> */}

          <button onClick={() => navigate("/dashboard/provider")} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Settings size={20} />
          </button>

          <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              {provider && (
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {provider.name}
                  </p>
                  <p className="text-xs text-gray-500">{provider.specialty}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`p-2 transition-colors ${
                isLoggingOut 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
              title={isLoggingOut ? 'Signing out...' : 'Sign Out'}
            >
              {isLoggingOut ? (
                <div className="w-[18px] h-[18px] border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogOut size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
