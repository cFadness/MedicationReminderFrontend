import React, {Component} from 'react';
import axios from 'axios';


class EditPharmacyInfo extends Component{

    constructor(props){
        super(props);
        this.state={
            name: "",
            address: "",
            phoneNumber: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.editPharmacyInfo(this.state);
    }

    render(){
        return (
            <div>
                <h5>Edit Pharmacy Information:</h5>
                <form onSubmit={this.handleSubmit}>
                    <div className="center-form">
                        <label>Pharmacy Name</label>
                        <input name="name" onChange={this.handleChange} value={this.state.name}/>
                    </div>
                    <div className="center-form">
                        <label>Pharmacy Address</label>
                        <input name="email" onChange={this.handleChange} value={this.state.email}/>
                    </div>
                    <div className="center-form">
                        <label>Pharmacy Phone Number</label>
                        <input name="password" type="password" onChange={this.handleChange} value={this.state.password}/>
                    </div>
                    <div>
                        <button type="submit" className="mt-3">Submit Changes</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default EditPharmacyInfo;