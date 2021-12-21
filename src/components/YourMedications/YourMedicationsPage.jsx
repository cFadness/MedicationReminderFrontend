import React, {Component} from 'react';
import axios from 'axios';
import YourMedicationsTable from './YourMedicationsTable';
import Alert from './Alert';

class YourMedicationsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrayOfMedications: [],
            newQuantity: 0,
            greenAlert: false,
            yellowAlert: false,
            redAlert: false,
            blueAlert: false,
            greenName : null,
            yellowName: null,
            redName: null,
            blueName: null
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

    takeDoseButton = async (medicationId, dose, quantity, name, refills, frequency, /* notifyEnabled */) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/medications/${medicationId}`, this.setNewQuantity(dose, quantity, name), {headers: {'x-auth-token': jwt}});
            console.log(response.data)
            this.setState({
                arrayOfMedications: response.data.medications
            })
            //if notifyEnabled is true, run these two methods
            this.quantityAlert(dose, frequency, this.state.newQuantity, name, refills)
            this.refillsAlert(dose, frequency, this.state.newQuantity, name, refills)
        }
        catch(err){
            console.log("Error making PUT request", err)
        }
    }

    quantityAlert = (dose, frequency, quantity, medName, refills) => {
        let daysWorthRemaining = quantity/(dose*frequency)
        if(daysWorthRemaining <= 5 && refills > 0){
            this.setState({
                yellowName: medName,
                yellowAlert: true
            })
        }
    }

    refillsAlert = (dose, frequency, quantity, medName, refills) => {
        let daysWorthRemaining = quantity/(dose*frequency)
        if(daysWorthRemaining <= 7 && refills == 0){
            this.setState({
                redName: medName,
                redAlert: true
            })
        }
    }

    resetYellowAlert = () => {
        this.setState({
            yellowAlert: false
        })
    }

    resetRedAlert = () => {
        this.setState({
            redAlert: false
        })
    }

    resetGreenAlert = () => {
        this.setState({
            greenAlert: false
        })
    }

    resetBlueAlert = () => {
        this.setState({
            blueAlert: false
        })
    }

    setNewQuantity = (dose, quantity, medName) => {
        let result = quantity - dose
        if(result >= 0){
            this.setState({
                newQuantity: result,
                greenName: medName,
                greenAlert: true
            })
            return (
                {
                    quantity: result
                }
            );
        }
        else{
            this.setState({
                newQuantity: result,
                blueName: medName,
                blueAlert: true
            })
            return (
                {
                    quantity: quantity
                }
            )
        }
    }

    //Add "notifyEnabled" property to Medications Schema on the backend API.

    //create a method that makes a PUT request by a medication's ID (obtained from passing as props to the medications table component)
    //... to change the property "notifyEnabled" to true and another method that changes it to false. Make sure to set state after
    //... the PUT request.

    //create a method that displays text in <p> tags "Enabled" or "Disabled" based on the medication's 'notifyEnabled' property
    //...being set to true or false.

    render(){
        return(
            <div>
                {this.state.redAlert ? <Alert severity="error" onClose={() => this.resetRedAlert()}>It is time to notify your pharmacy that you are out of refills for <strong>{this.state.redName}</strong></Alert> : null}
                {this.state.yellowAlert ? <Alert severity="warning" onClose={() => this.resetYellowAlert()}>It is time to notify your pharmacy that you need a refill of <strong>{this.state.yellowName}</strong></Alert> : null}
                {this.state.greenAlert ? <Alert severity="success" onClose={() => this.resetGreenAlert()}>You have taken a dose of <strong>{this.state.greenName}</strong></Alert> : null }
                {this.state.blueAlert ? <Alert severity="info" onClose={() => this.resetBlueAlert()}>Insufficient quantity to take a dose of <strong>{this.state.blueName}</strong></Alert> : null}
                <YourMedicationsTable arrayOfMedications={this.state.arrayOfMedications} takeDoseButton={this.takeDoseButton} />
            </div>
        )
    }
}


export default YourMedicationsPage;