import React from "react";
import {Link} from 'react-router-dom';


const NavBar = (props) => {

    const logout = () => {
        localStorage.removeItem('token')
        window.location = '/'
    }

    return(
        <div>
                {!props.currentUser &&
                    <React.Fragment>
                        <h4>Welcome</h4>
                    </React.Fragment>
                }
            <ul>
                {props.currentUser &&
                    <React.Fragment>
                        <h4>Welcome {props.currentUser.name}</h4>
                        <li>
                            <Link onClick={() =>logout()}>Logout</Link>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </div>
    )
}

export default NavBar;