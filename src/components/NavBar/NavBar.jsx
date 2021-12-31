import React from "react";
import {Link} from 'react-router-dom';
import './NavBar.css';


const NavBar = (props) => {

    const logout = () => {
        localStorage.removeItem('token')
        window.location = '/'
    }

    return(
        <div>
            {!props.currentUser &&
                <React.Fragment>
                    <div className="welcome">
                        <h2>Welcome</h2>
                    </div>
                </React.Fragment>
            }

            {props.currentUser &&
                <React.Fragment>
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <h4 className="navbar-brand">Welcome {props.currentUser.name}</h4>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/yourMedications"><strong>Your Medications</strong></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/updateMedications"><strong>Update Medications</strong></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={() =>logout()}><strong>Logout</strong></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </React.Fragment>
            }
        </div>
    )
}


export default NavBar;