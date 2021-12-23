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

    // split the 'quantity' property on the medication schema into 'number' and 'form' just like 'dose'
    // add dropdown menu for quantity.form

   
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
                        <input name="strength.number" onChange={this.handleChange} value={this.state.strength.number}/>
                        <select name="strength.measurement" onChange={this.handleChange} className="form-select form-control" aria-label="Default select example">
                            <option selected value={''}>Select</option>
                            <option value={"g"}>grams "g"</option>
                            <option value={"mg"}>miligrams "mg"</option>
                            <option value={"mg/ml"}>miligrams per mililiter "mg/ml"</option>
                            <option value={"%"}>%</option>
                            <option value={"mcg"}>micrograms "mcg"</option>
                        </select>
                    </div>
                    <div>
                        <label>Dose</label>
                        <input name="dose.number" onChange={this.handleChange} value={this.state.dose.number}/>
                        <select name="dose.form" onChange={this.handleChange} className="form-select form-control" aria-label="Default select example">
                            <option selected value={''}>Select</option>
                            <option value={"tablets"}>tablets</option>
                            <option value={"capsules"}>capsules</option>
                            <option value={"ml"}>mililiters "ml"</option>
                            <option value={"oz"}>ounces "oz"</option>
                        </select>
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