import { createContext , useContext , useState , useEffect} from "react";
import supabase from "../lib/supabase";


// creating the context to handle the state 
const GlobalContext = createContext({});

//Custom hook 
export const useGlobalContext = () => useContext(GlobalContext);


const GlobalProvider = ({children}) =>{
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
              setIsLoggedIn((prev)=>!prev) // Redirect if already logged in
            }
          });
    }, [])
    

    return(
        <GlobalContext.Provider value={{isLoggedIn , setIsLoggedIn , loading}}>
            {children}
        </GlobalContext.Provider>
    )
};

export default GlobalProvider;