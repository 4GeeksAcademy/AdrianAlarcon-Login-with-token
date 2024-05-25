const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null
		},
		actions: {
			login: async (email, password) => {
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
                    const data = await resp.json();
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;

                } catch (error) {
                    console.log(error);
                }
            },

			signup: async (email, password) => {
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
                    const resp = await fetch('https://organic-space-garbanzo-jw5pwjxrrgjcq5gq-3001.app.github.dev/api/signup', opts);
                    if (resp.status !== 201) {
                        alert("There has been some error");
                        return false;
                    }
                    const data = await resp.json();
                    alert(data.msg);
                    return true;

                } catch (error) {
                    console.log(error);
                }
            },

			syncToken: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !== "" && token !== undefined) setStore({ token: token });
			},

			logout: async () => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + getStore().token
					}
				};
				try {
					await fetch('https://organic-space-garbanzo-jw5pwjxrrgjcq5gq-3001.app.github.dev/api/logout', opts);
					sessionStorage.removeItem("token");
					setStore({ token: null });
				} catch (error) {
					console.log(error);
				}
			},

			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				};
				fetch("/api/hello", opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
