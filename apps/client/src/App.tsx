import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sports from './pages/Sports'
import Competitions from './pages/Competitions'
import About from './pages/About'
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
