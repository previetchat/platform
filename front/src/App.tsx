import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './chat'
import Friends from './friends'
import Home from './home'
import Invitations from './invitations'
import Login from './login'
import Register from './register'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/invites" element={<Invitations />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/chat" element={<Friends />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
