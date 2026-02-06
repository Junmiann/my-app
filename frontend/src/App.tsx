import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import './App.css'
import Classes from "./components/Classes.js";
import Home from './components/Home.js';
import Character from "./components/Character.js";

function App() {
  return (
    <BrowserRouter>
      <nav>
          <Link to="/">Home</Link>
          <Link to="/Classes">Classes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:id" element={<Character />} />
        
        <Route path="*" element={<Navigate to="/classes" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
