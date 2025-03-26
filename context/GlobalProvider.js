import { createContext , useContext , useState , useEffect} from "react";
import supabase from "../lib/supabase";


// creating the context to handle the state 
const GlobalContext = createContext({});

//Custom hook 
export const useGlobalContext = () => useContext(GlobalContext);


const GlobalProvider = ({children}) =>{
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)
    const [recite, setRecite] = useState({});


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
              setIsLoggedIn(true) // Redirect if already logged in
            }
            console.log('hello', session);
          });
    }, [])
    

    return(
        <GlobalContext.Provider value={{isLoggedIn , setIsLoggedIn , loading , recite , setRecite}}>
            {children}
        </GlobalContext.Provider>
    )
};

export default GlobalProvider;