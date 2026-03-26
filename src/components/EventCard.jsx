import React from "react";
import Card from "../components/icons/Card";
import { Link } from "react-router";
import { useContext } from "react";
import { SessionContext } from "../components/contexts/SessionContext";
import { supabase } from "../utils/supabase";

const EventCard = ({ event, registrations, setRegistrations }) => {
    const { profile } = useContext(SessionContext);
    const isRegistered = registrations?.some(
        (registration) =>
            registration.profile_id === profile?.id &&
            registration.event_id === event.id,
    );

    console.log(isRegistered);

    const register = async () => {
        const { data, error } = await supabase
            .from("registrations")
            .insert({
                event_id: event.id,
                profile_id: profile.id,
            })
            .select()
            .single();

        if (error) alert(error);
        if (data) {
            setRegistrations((prev) => {
                return [...prev, data];
            });
        }
    };

    const unregister = async () => {
        const { data: deletedRegistration, errorDeleteRegistration } =
            await supabase
                .from("registrations")
                .delete()
                .eq("event_id", event.id)
                .select()
                .single();
        if (errorDeleteRegistration) alert(deletedRegistration);
        if (deletedRegistration) {
            const updatedRegistrations = registrations.filter((registration) => {
                return registration.id != deletedRegistration.id;
            });
            setRegistrations(updatedRegistrations);
        }
    };

    return (
        <Card>
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>Start Date: {event.start_date}</p>
            <p>End Date: {event.end_date}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <p>Location: {event.location}</p>

            <div className="pt-5">
                <Link
                    to={`/ViewEvent/${event.id}`}
                    className="btn btn-primary rounded-full ml-3 btn-outline"
                >
                    View
                </Link>

                {profile?.role === "admin" && (
                    <>
                        <Link
                            to={`/EditEvent/${event.id}`}
                            className="btn btn-primary rounded-full"
                        >
                            Edit
                        </Link>

                        <button className="btn btn-secondary rounded-full ml-3">
                            Delete
                        </button>
                    </>
                )}

                {profile?.role === "user" && !isRegistered && (
                    <button className="ml-3 btn btn-primary rounded-full" onClick={register}>
                        Register
                    </button>
                )}

                {profile?.role === "user" && isRegistered && (
                    <button className="ml-3 btn btn-primary rounded-full" onClick={unregister}>
                        Unregister
                    </button>
                )}
            </div>
            {isRegistered && <p> You are already registered</p>}
        </Card>
    );
};

export default EventCard;