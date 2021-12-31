import React, {Component} from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import {Link} from 'react-router-dom';


class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }


    registerNewAccount = async (inputObject) => {
        try{
            let response = await axios.post('http://localhost:5000/api/users/register', inputObject)
            console.log(response)
            window.location = '/'
        }
        catch(err){
            console.log("Error creating new account", err)
        }
    }

    // Create an alert message that verifies you have registered your account.
    //... On close, run a function that redirects to the login page.

    // Add black dots to the password input boxes.

    // Find a better background image for login and register pages.


    render(){
        return(
            <div className="my-container">
                <div className="col-lg-6 col-lg-7 mx-auto text-center form p-4">
                    <div className="my-content">
                        <h1>Medication Reminder</h1>
                        <RegisterForm registerNewAccount={this.registerNewAccount}/>
                        <Link to='/login'>
                            Already a user? Login Here
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default RegisterPage;