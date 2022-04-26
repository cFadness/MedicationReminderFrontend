import React, {Component} from 'react';
import axios from 'axios';


class UpdatePharmacyInfoPage extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }


    editPharmacyInfo = async (editedInfo) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/pharmacyInfo`, editedInfo, {headers: {'x-auth-token': jwt}})
            console.log(response.data)
            window.location = '/yourMedications'
        }
        catch(err){
            console.log("Error editing pharmacy information", err)
        }
    }


    render(){
        return(
           <div>
               <EditPharmacyInfoForm editPharmacyInfo = {this.editPharmacyInfo} />
           </div>
        )
    }
}


export default UpdatePharmacyInfoPage;