import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthDataContext } from "./authContext";
import axios from "axios";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userDataContext = createContext()

function UserContext({children}){
   let [userData,setUserData] =useState("")
   let {serverUrl} = useContext(AuthDataContext)

   const getCurrentUser = async()=>{
    try {
        let result = await axios.get(serverUrl + "/api/user/getCurrentUser",
            { withCredentials: true })

        setUserData(result.data)
        console.log("getcurrentuser -", result.data)
    } catch (error) {
        setUserData(null)
        console.log(error)
        
    }
   }

   useEffect(()=>{

    getCurrentUser()


   },[])

    let value ={
        userData,setUserData , getCurrentUser

    }
    return(
        <div>
          <userDataContext.Provider value={value}>
            {children}
          </userDataContext.Provider>
        </div>
    )
}
export default UserContext