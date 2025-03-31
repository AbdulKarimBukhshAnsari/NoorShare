import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../lib/supabase";

// Creating the context to handle global state
const GlobalContext = createContext({});

// Custom hook to use the context
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recite, setRecite] = useState({});
  const [loadingAyah, setLoadingAyah] = useState(false)

  useEffect(() => {
    // Check if a user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      }
      setLoading(false); // Mark loading as complete
    };

    checkSession();

    // Listen for auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session); // Set isLoggedIn based on session existence
    });

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, recite, setRecite , loadingAyah , setLoadingAyah }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
