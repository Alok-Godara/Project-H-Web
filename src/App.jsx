import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./supabase/auth";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Navigation from "./components/Navigation";

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
          dispatch(login({ user }));
          navigate("/dashboard");
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
      <Navigation />
      <Outlet />
    </main>
  );
}

export default App;
