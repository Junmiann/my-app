import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Classes from "./components/Classes.js";
import Home from './components/Home.js';

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
