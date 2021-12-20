import React, {Component} from 'react';

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
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Email</label>
                    <input name="email" onChange={this.handleChange} value={this.state.email}/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" onChange={this.handleChange} value={this.state.password}/>
                </div>
                <div>
                    <button type="submit" className="mt-3">Login</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;