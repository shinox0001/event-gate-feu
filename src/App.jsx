import './App.css'
import { Routes, Route } from "react-router";
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { SessionContext } from './components/contexts/SessionContext';
import ManageEvents from './pages/ManageEvents';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event", event);
      console.log("session", session);
      if (event === "SIGNED_OUT") {
        setSession(null);
        setProfile(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session.user.id)
        .single();

      if (error) alert(error);
      if (data) {
        setProfile(data);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);


  return (
    <SessionContext.Provider value={{ session, profile, setProfile }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ManageEvents" element={<ManageEvents />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/EditEvent/:eventId" element={<EditEvent />} />
      </Routes>
    </SessionContext.Provider>
  );

}

export default App;
