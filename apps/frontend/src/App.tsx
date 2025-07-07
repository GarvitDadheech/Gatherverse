import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import { CreateRoomPage } from './components/create'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/join" element={<div className="flex items-center justify-center min-h-screen">Join Room Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  )
}

export default App
