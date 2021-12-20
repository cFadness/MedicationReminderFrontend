import React, {Component} from 'react';
import axios from 'axios';
import YourMedicationsTable from './YourMedicationsTable';

class YourMedicationsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrayOfMedications: []
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

    takeDoseButton = async (medicationId, dose, quantity) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/medications/${medicationId}`, this.newQuantity(dose, quantity), {headers: {'x-auth-token': jwt}});
            console.log(response.data)
            this.setState({
                arrayOfMedications: response.data.medications
            })
        }
        catch(err){
            console.log("Error making PUT request", err)
        }
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
                <YourMedicationsTable arrayOfMedications={this.state.arrayOfMedications} takeDoseButton={this.takeDoseButton} />
            </div>
        )
    }
}


export default YourMedicationsPage;