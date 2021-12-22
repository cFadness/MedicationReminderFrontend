import React, { Component }  from 'react';
import axios from 'axios';

class AddMedicationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            strength: {
                number: "",
                measurement: ""
            },
            dose: {
                number: "",
                form: ""
            },
            frequency: "",
            quantity: "",
            refills: ""
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addMedication(this.state)
    }

   
    render(){
        return(
           <div>
               <h5>Add a medication:</h5>
               <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input name="name" onChange={this.handleChange} value={this.state.name}/>
                    </div>
                    <div>
                        <label>Strength</label>
                        <input name="strength" onChange={this.handleChange} value={this.state.strength.number}/>
                        <input name="strength" onChange={this.handleChange} value={this.state.strength.measurement}/>
                    </div>
                    <div>
                        <label>Dose</label>
                        <input name="dose" onChange={this.handleChange} value={this.state.dose.number}/>
                        <input name="dose" onChange={this.handleChange} value={this.state.dose.form}/>
                    </div>
                    <div>
                        <label>Frequency "How many times per day?"</label>
                        <input name="frequency" onChange={this.handleChange} value={this.state.frequency}/>
                    </div>
                    <div>
                        <label>Quantity Remaining</label>
                        <input name="quantity" onChange={this.handleChange} value={this.state.quantity}/>
                    </div>
                    <div>
                        <label>Refills Remaining</label>
                        <input name="refills" onChange={this.handleChange} value={this.state.refills}/>
                    </div>
                    <div>
                        <button type="submit" className="mt-3">Add medication</button>
                    </div>
                </form>
           </div>
        )
    }
}


export default AddMedicationForm;