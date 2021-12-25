import React, { Component }  from 'react';
import axios from 'axios';

class EditMedicationForm extends Component {
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
            medication: null,
            selectedMedication: null
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
                },
                selectedMedication: this.state.selectedMedication
            })
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.editMedication(/* Object, this.state.selectedMedication */)
    }

    //method that makes a GET request for all meds by user ID and maps over them and displays a dropdown menu
    //... with element.name as the label and element._id as the value. The select name= attribute
    //... will be a state variable 'selectedMedication'.

    //method that filters the array of medications from the GET request by the medID in state (selectedMedication).
    //... then take that object (newArray[0]) and set state to its values.
    //... this.state.name = newArray[0].name        this.state.strengthNumber = newArray[0].strength.number etc.
   
    render(){
        return(
           <div>
               <h5>Edit a medication:</h5>
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


export default EditMedicationForm;