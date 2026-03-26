import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router";
import { supabase } from "../utils/supabase";
import { useEffect } from "react";
import EventCard from "../components/EventCard";

const Events = () => {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data: eventsData, error: eventsError } = await supabase
                .from("events")
                .select();
            if (eventsError) alert(eventsError);
            if (eventsData) setEvents(eventsData);
        };

        fetchEvents();
    }, []);

    return (
        <MainLayout>
            <div className="pt-5">
                <div className="grid grid-cols-3 gap-4">

                    {events?.map((event) => {
                        return <EventCard event={event} />;
                    })}

                </div>
            </div>
        </MainLayout>
    );
};

export default Events;