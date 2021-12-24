import React from 'react';


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
                <td>{element.name}</td>
                <td>{element.strength.number}{element.strength.measurement}</td>
                <td>{`${element.dose.number} ${element.dose.form}`}</td>
                <td>{element.frequency} times per day</td>
                <td>{`${element.quantity} ${element.dose.form}`}</td>
                <td>{element.refills}</td>
                <td>
                    <p>{notifyStatus}</p>
                    <button onClick={() => props.changeNotifications(element._id, element.notifyEnabled)}>{element.notifyEnabled ? "Disable" : "Enable"}</button>
                </td>
            </tr>
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Take Dose Button</th>
                    <th>Name</th>
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