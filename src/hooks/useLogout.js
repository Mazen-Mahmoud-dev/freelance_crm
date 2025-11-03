import { supabase } from "../lib/supabaseClient"; 
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      localStorage.removeItem("user");

      navigate("/auth?request=login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return { logout };
}