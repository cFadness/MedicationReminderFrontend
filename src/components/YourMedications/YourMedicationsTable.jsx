import React from 'react';


const YourMedicationsTable = (props) => {
    let medications = props.arrayOfMedications.map((element) => {
        return(
            <tr>
                {/* props.function displays red alert message when low on quantity or refills */}
                <td>
                    <button onClick={() => props.takeDoseButton(element._id, element.dose.number, element.quantity, element.name, element.refills, element.frequency)}>Take Dose</button>
                </td>
                <td>{element.name}</td>
                <td>{element.strength.number}{element.strength.measurement}</td>
                <td>{element.dose.number}{element.dose.form}</td>
                <td>{element.frequency}</td>
                <td>{element.quantity}</td>
                <td>{element.refills}</td>
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
                </tr>
            </thead>
            <tbody>
                {medications}
            </tbody>
        </table>
    );
}
 
export default YourMedicationsTable;