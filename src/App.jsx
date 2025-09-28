import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./supabase/auth";
import DataServices from "./supabase/dataConfig";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check user authentication status
    const checkAuth = async () => {
      try {
        const { user, error } = await authService.getCurrentUserService();

        if (error) {
          if (error.message !== "Auth session missing!") {
            dispatch(logout());
            navigate("/login");
            return;
          }
        }

        if (user) {
          // Check if user exists in providers table
          try {
            const providerData = await DataServices.getProviderById(user.id);
            if (providerData) {
              dispatch(login({ user, provider: providerData }));
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('provider', JSON.stringify(providerData));
              navigate("/dashboard");
            } else {
              // User authenticated but not in providers table - logout
              console.log('User not found in providers table during app initialization');
              await authService.logoutService();
              dispatch(logout());
              localStorage.removeItem('user');
              localStorage.removeItem('provider');
              navigate("/login");
            }
          } catch (error) {
            // Error fetching provider data - treat as unauthorized
            console.error('Error fetching provider data:', error);
            await authService.logoutService();
            dispatch(logout());
            localStorage.removeItem('user');
            localStorage.removeItem('provider');
            navigate("/login");
          }
        } else {
          dispatch(logout());
          navigate("/login");
        }
      } catch (error) {
        dispatch(logout());
        navigate("/login");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return loading ? (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
