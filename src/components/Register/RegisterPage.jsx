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
            let newAccount = await axios.post('http://localhost:5000/api/users/register', inputObject)
            console.log(newAccount)
            window.location = '/'
        }
        catch(err){
            console.log("Error creating new account", err)
        }
    }


    render(){
        return(
           <div className="col-lg-6 col-lg-7 mx-auto text-center form p-4">
               <h1>Medication Reminder</h1>
               <RegisterForm registerNewAccount={this.registerNewAccount}/>
               <Link to='/login'>
                   Already a user? Login Here
               </Link>
           </div>
        )
    }
}


export default RegisterPage;