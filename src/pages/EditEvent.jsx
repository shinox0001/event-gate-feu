import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router";
import { supabase } from "../utils/supabase";

const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const { data: eventData, error: eventError } = await supabase
                .from("events")
                .select()
                .eq("id", eventId)
                .single();
            if (eventError) alert(eventError);
            if (eventData) setEvent(eventData);
        };

        fetchEvent();
    }, [eventId]);
    return <MainLayout> {event?.title} </MainLayout>;
};

export default EditEvent;