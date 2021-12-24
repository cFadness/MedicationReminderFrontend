import React, { Component }  from 'react';
import axios from 'axios';

class AddMedicationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            strengthNumber: "",
            strengthMeasurement: "",
            doseNumber: "",
            doseForm: "",
            frequency: "",
            quantity: "",
            refills: "",
            medication: null
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }, () => {
            this.setState({
                medication: {
                    name: this.state.name,
                    strength: {
                        number: this.state.strengthNumber,
                        measurement: this.state.strengthMeasurement
                    },
                    dose: {
                        number: this.state.doseNumber,
                        form: this.state.doseForm
                    },
                    frequency: this.state.frequency,
                    quantity: this.state.quantity,
                    refills: this.state.refills
                }
            })
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.medication)
        this.props.addMedication(this.state.medication)
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
                        <input name="strengthNumber" onChange={this.handleChange} value={this.state.strengthNumber}/>
                        <select name="strengthMeasurement" onChange={this.handleChange} className="form-select form-control" aria-label="Default select example">
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
                        <input name="doseNumber" onChange={this.handleChange} value={this.state.doseNumber}/>
                        <select name="doseForm" onChange={this.handleChange} className="form-select form-control" aria-label="Default select example">
                            <option selected value={''}>Select</option>
                            <option value={"tablet(s)"}>tablets</option>
                            <option value={"capsule(s)"}>capsules</option>
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