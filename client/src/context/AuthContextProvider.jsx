import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { fetchAxios } from "../helpers/axiosHelper";


export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState();
  const [token, setToken] = useState();
  
  useEffect(()=>{
    //ver si hay token en el localStorage
    const tokenLS = localStorage.getItem("token");

    const fetchData = async() => {
      try {
        let res = await fetchAxios('/users/userById','GET',null, tokenLS);
        setUser(res.data.user);
        setToken(tokenLS);
      } catch (error) {
        console.log(error);
        
      }
    }

    if(tokenLS){
      fetchData();
    }

  },[])

  const logOut = () => {
    setToken();
    setUser();
    localStorage.removeItem("token")
  }
  
  return (
    <AuthContext.Provider value={{user, setUser, logOut, token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}
