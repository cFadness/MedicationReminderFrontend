import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import LoginForm from './LoginForm';


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    loginAccount = async (inputObject) => {
        try{
            const response = await axios.post('http://localhost:5000/api/users/login', inputObject);
            localStorage.setItem('token', response.data);
            console.log(response.data)
            window.location = '/'
        }
        catch(err){
            console.log("Error logging in", err)
        }
    }


    render(){
        return(
            <div className="my-container-two">
                <div className="col-lg-6 col-lg-7 mx-auto text-center form p-4">
                    <div className="my-content-two">
                        <h1>Medication Reminder</h1>
                        <LoginForm loginAccount={this.loginAccount}/>
                        <Link to='/register'>
                            Don't have an account? Register Here
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginPage;