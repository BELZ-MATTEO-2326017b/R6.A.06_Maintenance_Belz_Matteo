import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Sports from './pages/Sports'
import Competitions from './pages/Competitions'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Accueil</Link>
        <Link to="/sports" style={{ marginRight: '1rem' }}>Sports</Link>
        <Link to="/competitions">Compétitions</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/competitions" element={<Competitions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
