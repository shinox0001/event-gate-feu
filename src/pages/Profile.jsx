import React from 'react'
import MainLayout from '../layouts/MainLayout';
import { supabase } from '../utils/supabase';
import { useEffect, useContext, useState } from 'react';
import { SessionContext } from '../components/contexts/SessionContext';
import { Link } from 'react-router';
import EditProfileIcon from '../components/icons/EditProfileIcon';


const Profile = () => {
    const { session } = useContext(SessionContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', session.user.id)
                .single();
            if (error) console.log(error);
            else setProfile(data);
        }
        if (session) {
            fetchProfile();
        }
    }, [session])


    return <MainLayout>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-8">
                <h1 className="text-xl font-bold mb-4 flex justify-center">
                    Your Profile
                </h1>
                <div>
                    First Name: {profile?.firstname} <br />
                    Last Name: {profile?.lastname} <br />
                    Email: {profile?.email} <br />
                </div>

                <div>
                    <Link to="/EditProfile" className="btn btn-primary rounded-full btn-outline">
                        <EditProfileIcon className="text-lg" />
                        Edit Profile
                    </Link>
                </div>
            </fieldset>
        </div>
    </MainLayout>
};

export default Profile;