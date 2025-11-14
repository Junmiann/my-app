import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LoginForm from './components/login/LoginForm.js';
import Home from './components/Home.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
