import React, {Component} from 'react';
import axios from 'axios';


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
            const response = await axios.post(`http://localhost:5000/api/users/medications/${medId}`, editedInfo, {headers: {'x-auth-token': jwt}})
            console.log(response.data)
            this.setState({
                currentForm: 2
            })
        }
        catch(err){
            console.log("Error editing medication", err)
        }
    }


    render(){
        return(
           <div>
               
           </div>
        )
    }
}


export default UpdateMedicationPage;