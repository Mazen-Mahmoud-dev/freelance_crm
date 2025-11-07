import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    supabase.auth.signOut();
    localStorage.removeItem("token");
    if (window.location.pathname !== "/auth") {
      navigate("/auth?request=login");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setUser(null);
        } else {
          setUser(data?.user ?? null);
        }
      } catch (err) {
        console.error("Fetch user error:", err.message);
        if (user) logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        
        if (event === "SIGNED_OUT" || event === "TOKEN_REFRESH_FAILED") {
          // logout();
        } else {
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
