import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	console.log("this is your token: ", store.token);

	useEffect(() => {
		actions.syncToken();
	}, []);

	const handleOnClick = async () => {
		const success = await actions.login(email, password);
		if (success) {
			navigate("/");
		}
	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{store.token && store.token !== "" && store.token !== undefined ?
				"You are logged in with this token: " + store.token :
				<div>
					<input
						type="text"
						placeholder="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleOnClick}>Login</button>
				</div>
			}
		</div>
	);
};
