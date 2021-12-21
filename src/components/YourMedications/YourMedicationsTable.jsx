import React from 'react';


const YourMedicationsTable = (props) => {
    let medications = props.arrayOfMedications.map((element) => {
        return(
            <tr>
                <td>
                    <button onClick={() => props.takeDoseButton(element._id, element.dose.number, element.quantity, element.name, element.refills, element.frequency, /* element.notifyEnabled */)}>Take Dose</button>
                </td>
                <td>{element.name}</td>
                <td>{element.strength.number}{element.strength.measurement}</td>
                <td>{element.dose.number}{element.dose.form}</td>
                <td>{element.frequency}</td>
                <td>{element.quantity}</td>
                <td>{element.refills}</td>
                <td>
                    <p>{/* props.method3(element.notifyEnabled)*/}</p>
                    <button {/*onClick = props.method1(element.notifyEnabled) */}>Enable</button>
                    <button {/* onClick = props.method2(element.notifyEnabled) */}>Disable</button>
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