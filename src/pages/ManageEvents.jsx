import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Link } from 'react-router';

const ManageEvents = () => {
    return (
        <MainLayout>
            <div>
                <div className="flex gap-2 items-center boder-2 p-4">
                    <Link to="/AddEvents"
                        className="btn btn-primary rounded-full btn-outline">
                        Add Event
                    </Link>
                </div>
                <div>
                    We add the events here, and also show the list of events with edit and delete options.
                </div>
            </div>
        </MainLayout>
    )
}

export default ManageEvents