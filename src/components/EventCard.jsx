import React from "react";
import Card from "../components/icons/Card";
import { Link } from "react-router";
import { useContext } from "react";
import { SessionContext } from "../components/contexts/SessionContext";

const EventCard = ({ event }) => {
    const { profile } = useContext(SessionContext);

    const register = async (eventId) => {
        console.log(`todo: register event ${eventId}`);
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
                    to={`/view-event/${event.id}`}
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

                {profile?.role === "user" && (
                    <button
                        class="ml-3 btn btn-primary rounded-full"
                        onClick={() => {
                            register(event.id);
                        }}
                    >
                        Register
                    </button>
                )}
            </div>
        </Card>
    );
};

export default EventCard;