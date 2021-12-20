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
        //this.getrequest
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

    //method for the button onClick attribute. Makes PUT request and sets state to response.data.medications

    render(){
        <div>
            <YourMedicationsTable arrayOfMedications={this.state.arrayOfMedications} />
        </div>
    }
}


export default YourMedicationsPage;