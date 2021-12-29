import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddMedicationForm from './AddMedicationForm';
import EditMedicationForm from './EditMedicationForm';
import RemoveMedicationForm from './RemoveMedicationForm';

// Add the 'remove medication' form
// Add alerts to each form if user input is invalid
// Proceed to style the entire app
// Add color coded table in regard to quantity remaining and refills remaining
// Add polish to app as ideas arise


class UpdateMedicationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentFormAdd: false,
            currentFormEdit: false,
            currentFormRemove: false
        };
    }


    addMedication = async (newMedication) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/users/medications', newMedication, {headers: {'x-auth-token': jwt}})
            console.log(response.data)
            window.location = '/yourMedications'
        }
        catch(err){
            console.log("Error adding medication", err)
        }
    }

    editMedication = async (editedInfo, medId) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/medications/${medId}`, editedInfo, {headers: {'x-auth-token': jwt}})
            console.log(response.data)
            window.location = '/yourMedications'
        }
        catch(err){
            console.log("Error editing medication", err)
        }
    }

    removeMedication = async (medId) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/api/users/medications/${medId}`, {headers: {'x-auth-token': jwt}})
            console.log(response.data)
            window.location = '/yourMedications'
        }
        catch(err){
            console.log("Error deleting medication", err)
        }
    }

    chooseAddForm  = () => {
        this.setState({
            currentFormAdd: true,
            currentFormEdit: false,
            currentFormRemove: false
        })
    }

    chooseEditForm  = () => {
        this.setState({
            currentFormAdd: false,
            currentFormEdit: true,
            currentFormRemove: false
        })
    }

    chooseRemoveForm  = () => {
        this.setState({
            currentFormAdd: false,
            currentFormEdit: false,
            currentFormRemove: true
        })
    }
     


    render(){
        return(
           <div>
               <div>
                   <Link onClick={this.chooseAddForm}>Add medication</Link>
                   <Link onClick={this.chooseEditForm}>Edit medication</Link>
                   <Link onClick={this.chooseRemoveForm}>Remove medication</Link>
               </div>
               {this.state.currentFormAdd ? <AddMedicationForm addMedication = {this.addMedication} /> : null}
               {this.state.currentFormEdit ? <EditMedicationForm editMedication = {this.editMedication} /> : null}
               {this.state.currentFormRemove ? <RemoveMedicationForm removeMedication = {this.removeMedication} /> : null}
           </div>
        )
    }
}


export default UpdateMedicationPage;