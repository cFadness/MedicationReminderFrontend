import React from 'react';
import './YourMedicationsTable.css'


const YourMedicationsTable = (props) => {
    let medications = props.arrayOfMedications.map((element) => {
        let notifyStatus
        if(element.notifyEnabled === true){
            notifyStatus = "Enabled"
        }
        else{
            notifyStatus = "Disabled"
        }

        return(
            <tr>
                <td>
                    <button onClick={() => props.takeDoseButton(element._id, element.dose.number, element.quantity, element.name, element.refills, element.frequency, element.notifyEnabled)}>Take Dose</button>
                </td>
                <td className="left-align">{element.name}</td>
                <td>{element.strength.number}{element.strength.measurement}</td>
                <td>{`${element.dose.number} ${element.dose.form}`}</td>
                <td>{element.frequency} time(s) per day</td>
                <td className={props.quantityColor(element.dose.number, element.frequency, element.quantity)}>{`${element.quantity} ${element.dose.form}`}</td>
                <td className={props.refillsColor(element.refills)}>{element.refills}</td>
                <td className={props.notifyColor(notifyStatus)}>
                    {notifyStatus}
                    <button className="notify-button" onClick={() => props.changeNotifications(element._id, element.notifyEnabled)}>{element.notifyEnabled ? "Disable" : "Enable"}</button>
                </td>
            </tr>
        )
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th className="left-align">Name</th>
                    <th>Strength</th>
                    <th>Dose</th>
                    <th>Frequency</th>
                    <th>Quantity Remaining</th>
                    <th>Refills Remaining</th>
                    <th>Pharmacy Notifications</th>
                </tr>
            </thead>
            <tbody>
                {medications}
            </tbody>
        </table>
    );
}
 
export default YourMedicationsTable;