import React, { Component }  from 'react';
import axios from 'axios';
import './UpdateMedicationPage.css';

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
            selectedMedication: "",
            arrayOfMedications: []
        };
    }

    componentDidMount(){
        this.getUserMedications()
    }

    handleChange = (event) => {
        if(event.target.name === "selectedMedication" && event.target.value !== ""){
            this.setState({
                [event.target.name]: event.target.value,
            }, () => {
                this.setState({
                    selectedMedication: this.state.selectedMedication
                })
            });
            this.formFiller(event.target.value)
        }
        else{
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
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.editMedication(this.state.medication, this.state.selectedMedication)
    }

    getUserMedications = async () => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/users/medications`, {headers: {'x-auth-token': jwt}});
            console.log(response.data)
            this.setState({
                arrayOfMedications: response.data
            })
        }
        catch(err){
            console.log("Error getting user medications", err)
        }
    }

    medicationSelector = () => {
        let dropDownList = this.state.arrayOfMedications.map((element) => {
            return(
                <option value={element._id}>{element.name}</option>
            )
        });
        return(
            <select name="selectedMedication" onChange={this.handleChange} className="dropdown2" aria-label="Default select example">
                <option selected value={""}>Select</option>
                {dropDownList}
            </select>
        )
    }

    formFiller = (medId) => {
        let newArray = this.state.arrayOfMedications.filter((element) => {
            if(element._id === medId){
                return true
            }
            else{
                return false
            }
        });

        this.setState({
            name: newArray[0].name,
            strengthNumber: newArray[0].strength.number,
            strengthMeasurement: newArray[0].strength.measurement,
            doseNumber: newArray[0].dose.number,
            doseForm: newArray[0].dose.form,
            frequency: newArray[0].frequency,
            quantity: newArray[0].quantity,
            refills: newArray[0].refills
        })
    }
   
    render(){
        return(
           <div className="update-form">
               <h5>Edit a medication:</h5>
               <div className="center-form">
                    {this.medicationSelector()}
               </div>
               <form onSubmit={this.handleSubmit}>
                    <div className="center-form">
                        <label>Name</label>
                        <input name="name" onChange={this.handleChange} value={this.state.name}/>
                    </div>
                    <div className="center-form-strength">
                        <label>Strength</label>
                        <input name="strengthNumber" onChange={this.handleChange} value={this.state.strengthNumber}/>
                        <select name="strengthMeasurement" onChange={this.handleChange} className="dropdown" aria-label="Default select example">
                            <option selected={this.state.strengthMeasurement === ""} value={''}>Select</option>
                            <option selected={this.state.strengthMeasurement === "g"} value={"g"}>grams "g"</option>
                            <option selected={this.state.strengthMeasurement === "mg"} value={"mg"}>miligrams "mg"</option>
                            <option selected={this.state.strengthMeasurement === "mg/ml"} value={"mg/ml"}>miligrams per mililiter "mg/ml"</option>
                            <option selected={this.state.strengthMeasurement === "%"} value={"%"}>%</option>
                            <option selected={this.state.strengthMeasurement === "mcg"} value={"mcg"}>micrograms "mcg"</option>
                        </select>
                    </div>
                    <div className="center-form-dose">
                        <label>Dose</label>
                        <input name="doseNumber" onChange={this.handleChange} value={this.state.doseNumber}/>
                        <select name="doseForm" onChange={this.handleChange} className="dropdown" aria-label="Default select example">
                            <option selected={this.state.doseForm === ""} value={''}>Select</option>
                            <option selected={this.state.doseForm === "tablet(s)"} value={"tablet(s)"}>tablets</option>
                            <option selected={this.state.doseForm === "capsule(s)"} value={"capsule(s)"}>capsules</option>
                            <option selected={this.state.doseForm === "ml"} value={"ml"}>mililiters "ml"</option>
                            <option selected={this.state.doseForm === "oz"} value={"oz"}>ounces "oz"</option>
                        </select>
                    </div>
                    <div className="center-form">
                        <label>Frequency "How many times per day?"</label>
                        <input name="frequency" onChange={this.handleChange} value={this.state.frequency}/>
                    </div>
                    <div className="center-form">
                        <label>Quantity Remaining</label>
                        <input name="quantity" onChange={this.handleChange} value={this.state.quantity}/>
                    </div>
                    <div className="center-form">
                        <label>Refills Remaining</label>
                        <input name="refills" onChange={this.handleChange} value={this.state.refills}/>
                    </div>
                    <div>
                        <button type="submit" className="mt-3">Edit Medication</button>
                    </div>
                </form>
           </div>
        )
    }
}


export default EditMedicationForm;