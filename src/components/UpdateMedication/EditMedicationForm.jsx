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
            selectedMedication: "",
            arrayOfMedications: []
        };
    }

    componentDidMount(){
        this.getUserMedications()
    }

    componentDidUpdate(prevState){
        if(this.state.selectedMedication !== prevState.selectedMedication){
            this.formFiller(this.state.selectedMedication)
        }
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
            <select name="selectedMedication" onChange={this.handleChange} className="form-select form-control" aria-label="Default select example">
                <option selected value={""}>Select</option>
                {dropDownList}
            </select>
        )
    }

    // formFiller = (medication) => {
    //     this.setState({
    //         name: medication.name,
    //         strengthNumber: medication.strength.number,
    //         strengthMeasurement: medication.strength.measurement,
    //         doseNumber: medication.dose.number,
    //         doseForm: medication.dose.form,
    //         frequency: medication.frequency,
    //         quantity: medication.quantity,
    //         refills: medication.refills
    //     })
    // }

    formFiller = (selectedMedication) => {
        let newArray = this.state.arrayOfMedications.filter((element) => {
            if(element._id === selectedMedication){
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
           <div>
               <h5>Edit a medication:</h5>
               {this.medicationSelector()}
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
                        <button type="submit" className="mt-3">Edit Medication</button>
                    </div>
                </form>
           </div>
        )
    }
}


export default EditMedicationForm;