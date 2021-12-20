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

    //GET request for user's medications. set state to response.data

    //method for the button onClick attribute. Makes PUT request and sets state to response.data.medications

    render(){
        <div>
            <YourMedicationsTable arrayOfMedications={this.state.arrayOfMedications} />
        </div>
    }
}


export default YourMedicationsPage;