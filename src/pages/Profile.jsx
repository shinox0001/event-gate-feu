import React from 'react'
import MainLayout from '../layouts/MainLayout';
import { supabase } from '../utils/supabase';
import { useEffect, useContext } from 'react';
import { SessionContext } from '../components/contexts/SessionContext';


const Profile = () => {
    const session = useContext(SessionContext);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error} = await supabase.from( 'characters').select ( ).eq('id', session.user.id).single();
            if (error) alert(error);
            if (data) console.log("data", data);
        }
        if (session) {
            fetchProfile();
        }
    }, [])
    

  return <MainLayout> This is the Profile Page </MainLayout>
    
  
};

export default Profile;