import React, {Component} from 'react';
import './RegisterForm.css'


class RegisterForm extends Component{

    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.registerNewAccount(this.state);
    }

    render(){
        return (
            <div className="register-form">
                <h5>Register your free account:</h5>
                <form onSubmit={this.handleSubmit}>
                    <div className="center-form">
                        <label>Username</label>
                        <input name="name" onChange={this.handleChange} value={this.state.name}/>
                    </div>
                    <div className="center-form">
                        <label>Email</label>
                        <input name="email" onChange={this.handleChange} value={this.state.email}/>
                    </div>
                    <div className="center-form">
                        <label>Password</label>
                        <input name="password" type="password" onChange={this.handleChange} value={this.state.password}/>
                    </div>
                    <div>
                        <button type="submit" className="mt-3">Create Account</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default RegisterForm;