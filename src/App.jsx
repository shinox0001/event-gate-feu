import './App.css'
import { Routes, Route } from "react-router";
import { Homepage } from './pages/Homepage';
import SignUp from './pages/SignUp';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import { SessionContext } from './components/contexts/SessionContext';
import Login from './pages/Login';
import { useNavigate } from 'react-router';
import Profile from './pages/Profile';

function App() {
  const [session, setSession] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event", event);
      console.log("session", session);
      if (event === "SIGNED_OUT") {
        navigate("/Login");
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  return (
    <SessionContext.Provider value={session}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </SessionContext.Provider>
    );

  }

export default App;
