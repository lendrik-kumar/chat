import { Routes, Route, Navigate } from "react-router-dom";
import Auth from '../src/pages/auth/index.jsx'
import Chat from "./pages/chat/index.jsx";
import Profile from "./pages/profile/index.jsx";

const App = () => {

  return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to='/auth'/>} />
      </Routes>
  )
}

export default App
