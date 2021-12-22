import React, {Component} from 'react';
import axios from 'axios';
import AddMedicationForm from './AddMedicationForm';


class UpdateMedicationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentForm: 1
        };
    }


    addMedication = async (newMedication) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/users/medications', newMedication, {headers: {'x-auth-token': jwt}})
            console.log(response.data)
            this.setState({
                currentForm: 1
            })
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
            this.setState({
                currentForm: 2
            })
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
            this.setState({
                currentForm: 3
            })
        }
        catch(err){
            console.log("Error deleting medication", err)
        }
    }


    render(){
        return(
           <div>
               <AddMedicationForm addMedication = {this.addMedication}/>
           </div>
        )
    }
}


export default UpdateMedicationPage;