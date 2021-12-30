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

    takeDoseButton = async (medicationId, dose, quantity, name, refills, frequency, notifications) => {
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/medications/${medicationId}`, this.setNewQuantity(dose, quantity, name), {headers: {'x-auth-token': jwt}});
            console.log(response.data)
            this.setState({
                arrayOfMedications: response.data.medications
            });

            if(notifications === true){
                this.quantityAlert(dose, frequency, this.state.newQuantity, name, refills)
                this.refillsAlert(dose, frequency, this.state.newQuantity, name, refills)
            }
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

    changeNotifications = async (medicationId, notifications) => {
        let enable
            if(notifications === false){
                enable = {
                    notifyEnabled: true
                }
            }
            else{
                enable = {
                    notifyEnabled: false
                }
            }
        try{
            const jwt = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/medications/${medicationId}`, enable, {headers: {'x-auth-token': jwt}});
            console.log(response.data)
            this.setState({
                arrayOfMedications: response.data.medications
            })
        }
        catch(err){
            console.log("Error making PUT request", err)
        }
    }

    quantityColor  = (dose, frequency, quantity) => {
        let color
        let daysWorthRemaining = quantity/(dose*frequency)
        if(daysWorthRemaining >= 20){
            color = "green"
        }
        else if(daysWorthRemaining < 20 && daysWorthRemaining >= 10){
            color = "yellow"
        }
        else{
            color = "red"
        }

        return color
    }

    refillsColor = (refills) => {
        let color
        if(refills >= 2){
            color = "green"
        }
        else if(refills == 1){
            color = "yellow"
        }
        else{
            color = "red"
        }

        return color
    }

    notifyColor = (notifications) => {
        let color
        if(notifications === "Enabled"){
            color = "green"
        }
        else{
            color = "red"
        }

        return color
    }

    render(){
        return(
            <div className="med-page">
                {this.state.redAlert ? <Alert severity="error" onClose={() => this.resetRedAlert()}>It is time to notify your pharmacy that you are out of refills for <b>{this.state.redName}</b></Alert> : null}
                {this.state.yellowAlert ? <Alert severity="warning" onClose={() => this.resetYellowAlert()}>It is time to notify your pharmacy that you need a refill of <b>{this.state.yellowName}</b></Alert> : null}
                {this.state.greenAlert ? <Alert severity="success" onClose={() => this.resetGreenAlert()}>You have taken a dose of <b>{this.state.greenName}</b></Alert> : null }
                {this.state.blueAlert ? <Alert severity="info" onClose={() => this.resetBlueAlert()}>Insufficient quantity to take a dose of <b>{this.state.blueName}</b></Alert> : null}
                <YourMedicationsTable notifyColor={this.notifyColor} refillsColor={this.refillsColor} quantityColor={this.quantityColor} arrayOfMedications={this.state.arrayOfMedications} takeDoseButton={this.takeDoseButton} changeNotifications={this.changeNotifications} />
            </div>
        )
    }
}


export default YourMedicationsPage;