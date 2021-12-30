import React, { Component }  from 'react';
import axios from 'axios';
import './UpdateMedicationPage.css';

class RemoveMedicationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedMedication: "",
            arrayOfMedications: []
        };
    }

    componentDidMount(){
        this.getUserMedications()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }, () => {
            this.setState({
                selectedMedication: this.state.selectedMedication
            })
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.removeMedication(this.state.selectedMedication)
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
   
    render(){
        return(
           <div className="update-form">
               <h5>Remove a medication:</h5>
               <div className="center-form">
                    {this.medicationSelector()}
               </div>
               <form onSubmit={this.handleSubmit}>
                    <div>
                        <button type="submit" className="mt-3">Remove Medication</button>
                    </div>
                </form>
           </div>
        )
    }
}


export default RemoveMedicationForm;