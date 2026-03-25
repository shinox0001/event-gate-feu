import React from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/form/Input";

const AddEvent = () => {



    return (
        <MainLayout>
            <div className="pt-5">
                <form>
                    <div className="flex">
                        <div className="w-1/3">
                            {/* title, start date, end date, start time, end time, location */}
                            <Input type="text" label="Title" placeholder="Enter Title" />
                            <Input
                                type="date"
                                label="Start Date"
                                placeholder="Select Start Date"
                                name="start_date"
                            />
                            <Input
                                type="date"
                                label="End Date"
                                placeholder="Select End Date"
                                name="end_date"
                            />
                            <Input
                                type="time"
                                label="Start Time"
                                placeholder="Select Start Time"
                                name="start_time"
                            />
                            <Input
                                type="time"
                                label="End Time"
                                placeholder="Select End Time"
                                name="end_time"
                            />
                            <Input
                                type="text"
                                label="Location"
                                placeholder="Enter Location"
                                name="location"
                            />
                        </div>
                        <div className="flex-1">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Description</legend>
                                <textarea
                                    className="textarea h-full w-full"
                                    placeholder="Bio"
                                    rows={20}
                                    name="description"
                                ></textarea>
                            </fieldset>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default AddEvent;