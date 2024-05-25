import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto d-flex">
                    {!store.token ? (
                        <>
                            <Link to="/signup">
                                <button className="btn btn-secondary mx-3">Sign up</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary mx-3">Log in</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/private">
                                <button className="btn btn-secondary mx-3">Private</button>
                            </Link>
                            <button onClick={() => actions.logout()} className="btn btn-primary mx-3">Log out</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
