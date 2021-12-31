import React, {Component} from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import {Link} from 'react-router-dom';
import Alert from '../YourMedications/Alert';


class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            alert: false
        };
    }


    registerNewAccount = async (inputObject) => {
        try{
            let response = await axios.post('http://localhost:5000/api/users/register', inputObject)
            console.log(response)
            this.setState({
                alert: true
            })
        }
        catch(err){
            console.log("Error creating new account", err)
        }
    }

    confirmAlert = () => {
        this.setState({
            alert: false
        })
        window.location = '/'
    }

    render(){
        return(
            <div className="my-container">
                <div className="col-lg-6 col-lg-7 mx-auto text-center form p-4">
                    <div className="my-content">
                        <h1>Medication Reminder</h1>
                        <p className="alertOne">{this.state.alert ? <Alert severity="success">You have successfully created your account! <button onClick={() => this.confirmAlert()} className="buttonOne"><strong className="click-here">CLICK HERE</strong></button> to login</Alert> : null}</p>
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