import React from "react";
import { NavLink } from "react-router";
import SignUpIcon from "./icons/SignUpIcon";
import HomeIcon from "./icons/HomeIcon";
import { useContext, useEffect } from "react";
import { SessionContext } from "./contexts/SessionContext";
import { supabase } from "../utils/supabase";
import LoginIcon from "./icons/LoginIcon";
import ProfileIcon from "./icons/ProfileIcon";
import ManageEventsIcon from "./icons/ManageEventsIcon";

const NavBar = () => {
	const { session, profile } = useContext(SessionContext);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error("Error signing out:");
	}

	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="flex w-full max-w-7xl mx-auto">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">
						<span className="text-primary">Event</span>
						<span className="text-secondary">Gate</span>
					</a>
				</div>
				<div className="flex-none">
					<NavLink
						to="/"
						className="btn btn-warning mr-4 rounded-full btn-outline"
					>
						<HomeIcon className="text-lg" />
						Home
					</NavLink>
					{!session && (
						<NavLink to="/SignUp" className="btn btn-primary mr-4 rounded-full btn-outline justify-center">
							<SignUpIcon className="text-lg" />
							Sign Up
						</NavLink>
					)}

					{!session && (
						<NavLink to="/Login" className="btn btn-info mr-4 rounded-full btn-outline justify-center">
							<LoginIcon className="text-lg" />
							Login
						</NavLink>
					)}

					{ }
					{session && (
						<button onClick={handleLogout} className="btn btn-error mr-4 rounded-full btn-outline">
							Log Out
						</button>
					)}

					{profile?.role === "admin" && (
						<NavLink to="/ManageEvents" className="btn btn-secondary mr-4 rounded-full btn-outline justify-center">
							<ManageEventsIcon className="text-lg" />
							Manage Events
						</NavLink>


					)}
					{session && (
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img
										alt="Tailwind CSS Navbar component"
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP63q_lX7WgzYAKL11BycUQI9e1giJApx9Bw&s"
									/>
								</div>
							</div>
							<ul
								tabIndex="-1"
								className="menu menu-sm dropdown-content bg-lightgrey-400 box z-1 mt-3 w-52 p-2"
							>
								<li>
									<div className="justify-between">
										<NavLink to="/Profile"
											className="btn btn-ghost mr-4 justify-center">
											<ProfileIcon className="text-lg" />
											Profile
										</NavLink>
									</div>


								</li>
							</ul>
						</div>
					)}


				</div>
			</div>
		</div>
	);
};

export default NavBar;