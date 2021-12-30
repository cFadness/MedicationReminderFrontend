import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddMedicationForm from './AddMedicationForm';
import EditMedicationForm from './EditMedicationForm';
import RemoveMedicationForm from './RemoveMedicationForm';
import Alert from '../YourMedications/Alert';


class UpdateMedicationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentFormAdd: false,
            currentFormEdit: false,
            currentFormRemove: false,
            alert: false
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
            this.setState({
                alert: true
            })
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
            this.setState({
                alert: true
            })
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

    resetAlert = () => {
        this.setState({
            alert: false
        })
    }
     


    render(){
        return(
           <div>
               <div className="links">
                    <h5>
                        <Link onClick={this.chooseAddForm}>Add medication </Link>
                        <Link onClick={this.chooseEditForm}>Edit medication </Link>
                        <Link onClick={this.chooseRemoveForm}>Remove medication</Link>
                    </h5>
               </div>
               <div className="col-lg-6 col-lg-7 mx-auto text-center form p-4">
                    <p className="alert">{this.state.alert ? <Alert severity="error" onClose={() => this.resetAlert()}>One or more fields are invalid</Alert> : null}</p>
                    {this.state.currentFormAdd ? <AddMedicationForm addMedication = {this.addMedication} /> : null}
                    {this.state.currentFormEdit ? <EditMedicationForm editMedication = {this.editMedication} /> : null}
                    {this.state.currentFormRemove ? <RemoveMedicationForm removeMedication = {this.removeMedication} /> : null}
               </div>
           </div>
        )
    }
}


export default UpdateMedicationPage;