


import { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"
import { authDataContext } from './AuthContext'

export const adminDataContext = createContext()

function AdminContext({ children }) {

  const [adminData, setAdminData] = useState(null)

  const authContext = useContext(authDataContext);

  if (!authContext) {
    throw new Error("AdminContext must be used inside AuthContext");
  }

  const { serverUrl } = authContext;

  const getAdmin = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/user/getAdmin",
        { withCredentials: true }
      )

      setAdminData(result.data)
      console.log(result.data)

    } catch (error) {
      setAdminData(null)
      console.log(error)
    }
  }

  useEffect(() => {
    if (serverUrl) {
      getAdmin()
    }
  }, [serverUrl])

  const value = {
    adminData,
    setAdminData,
    getAdmin
  }

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  )
}

export default AdminContext