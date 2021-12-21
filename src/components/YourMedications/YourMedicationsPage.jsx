import React, {Component} from 'react';
import axios from 'axios';
import YourMedicationsTable from './YourMedicationsTable';
import Alert from './Alert';

class YourMedicationsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrayOfMedications: [],
            hasTakenMeds: false,
            medicationName : null
        }
    }

    componentDidMount(){
        this.getUserMedications()
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

    takeDoseButton = async (medicationId, dose, quantity, name) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/medications/${medicationId}`, this.newQuantity(dose, quantity), {headers: {'x-auth-token': jwt}});
            console.log(response.data)
            this.setState({
                arrayOfMedications: response.data.medications
            })
            this.confirmationAlert(name)
        }
        catch(err){
            console.log("Error making PUT request", err)
        }
    }

    confirmationAlert = (medName) => {
        this.setState({
            medicationName: medName,
            hasTakenMeds: true
        })
    }

    resetAlert = () => {
        this.setState({
            hasTakenMeds: false
        })
    }

    newQuantity = (dose, quantity) => {
        let result = quantity - dose
        return (
            {
                quantity: result
            }
        );
    }

    render(){
        return(
            <div>
                {this.state.hasTakenMeds ? <Alert severity="success" onClose={() => this.resetAlert()}>You have taken a dose of {this.state.medicationName}</Alert> : null }
                <YourMedicationsTable arrayOfMedications={this.state.arrayOfMedications} takeDoseButton={this.takeDoseButton} />
            </div>
        )
    }
}


export default YourMedicationsPage;