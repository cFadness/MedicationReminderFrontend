import React, {Component} from 'react';
import './LoginForm.css';

class LoginForm extends Component{

    constructor(props){
        super(props);
        this.state={
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
        this.props.loginAccount(this.state);
    }

    render(){
        return (
            <div className="login-form">
                <h5>Login:</h5>
                <form onSubmit={this.handleSubmit}>
                    <div className="center-form">
                        <label>Email</label>
                        <input name="email" onChange={this.handleChange} value={this.state.email}/>
                    </div>
                    <div className="center-form">
                        <label>Password</label>
                        <input name="password" type="password" onChange={this.handleChange} value={this.state.password}/>
                    </div>
                    <div>
                        <button type="submit" className="mt-3">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;