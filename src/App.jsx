import './App.css'
import { Routes, Route } from "react-router";
import { Homepage } from './pages/Homepage';
import SignUp from './pages/SignUp';

function App() {
  return (
  <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    );
}

export default App;
