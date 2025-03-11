import { Routes, Route, Navigate } from "react-router-dom";
import Auth from '../src/pages/auth/index.jsx'
import Chat from "./pages/chat/index.jsx";
import Profile from "./pages/profile/index.jsx";
import { useAppStore } from "./store/index.js";
import { useState, useEffect } from "react";
import { apiClient } from "./lib/api-client.js";
import { GET_USER_INFO } from "./utils/constants.js";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated ? <Navigate to="/chat" /> : children
}

const App = () => {
  const { userInfo, setUserInfo } = useAppStore()
  const [loading, setLoading] = useState(true)

  const getUserInfo = async () => {
    try {
      const response = await apiClient.get(GET_USER_INFO, {
        withCredentials: true
      })
      if(response === 200 && response.data.id){
        setUserInfo(response.data.user)
      }
      else{
        setUserInfo(undefined)
      }
    } catch (error) {
      setUserInfo(undefined)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      getUserInfo()
    } else {
      setLoading(false)
    }
  }, [userInfo, setUserInfo])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="*" element={<Navigate to='/auth' />} />
    </Routes>
  )
}

export default App
