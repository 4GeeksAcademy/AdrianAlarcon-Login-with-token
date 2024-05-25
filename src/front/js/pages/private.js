import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.token || store.token === "" || store.token === undefined) {
			navigate("/login");
		} else {
			actions.getMessage();
		}
	}, [store.token]);

	return (
		<div className="text-center mt-5">
			<h1>Private Page</h1>
			{store.message ? <p>{store.message}</p> : <p>Loading...</p>}
			<button onClick={() => actions.logout()}>Logout</button>
		</div>
	);
};
