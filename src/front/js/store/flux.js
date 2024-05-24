const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null
		},
		actions: {
			login: async (email, password) => {
				console.log(email, password, "in context")
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
				try {
					const resp = await fetch('https://organic-space-garbanzo-jw5pwjxrrgjcq5gq-3001.app.github.dev/api/token', opts);
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}
					const data = await resp.json(); // Aquí falta llamar a la función .json()
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.log(error);
				}
			},
			syncToken: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !== "" && token !== undefined) setStore({ token: token });
			}
		}
	}
};

export default getState;
