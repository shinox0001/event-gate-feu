import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router";
import { supabase } from "../utils/supabase";
import { useEffect } from "react";
import EventCard from "../components/EventCard";
import { useContext } from "react";
import { SessionContext } from "../components/contexts/SessionContext";

const Events = () => {
    const [events, setEvents] = useState(null);
    const [registrations, setRegistrations] = useState(null);
    const { profile } = useContext(SessionContext);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data: eventsData, error: eventsError } = await supabase
                .from("events")
                .select();
            if (eventsError) alert(eventsError);
            if (eventsData) setEvents(eventsData);
        };

        fetchEvents();

        const fetchRegistrations = async () => {
            const { data: registrationsData, error: registrationsError } =
                await supabase
                    .from("registrations")
                    .select()
                    .eq("profile_id", profile?.id);
            if (registrationsError) alert(registrationsError);
            if (registrationsData) setRegistrations(registrationsData);
        };
        if (profile) fetchRegistrations();
    }, [profile]);

    console.log("registrations", registrations);

    return (
        <MainLayout>
            <div className="pt-5">
                <div className="grid grid-cols-3 gap-4">
                    {events?.map((event) => {
                        return (
                            <EventCard
                                event={event}
                                registrations={registrations}
                                setRegistrations={setRegistrations}
                            />
                        );
                    })}
                </div>
            </div>
        </MainLayout>
    );
};

export default Events;