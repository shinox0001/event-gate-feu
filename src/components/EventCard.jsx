import React from "react";
import Card from "./icons/Card";
import { Link } from "react-router";

const EventCard = ({ event }) => {
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
                    to={`/EditEvent/${event.id}`}
                    className="btn btn-primary rounded-full"
                >
                    Edit
                </Link>
                <Link
                    to={`/view-event/${event.id}`}
                    className="btn btn-primary rounded-full ml-3 btn-outline"
                >
                    View
                </Link>
                <button className="btn btn-secondary rounded-full ml-3">Delete</button>
            </div>
        </Card>
    );
};

export default EventCard;