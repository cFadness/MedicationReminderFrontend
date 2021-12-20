import React from 'react';


const YourMedicationsTable = (props) => {
    let medications = props.arrayOfMedications.map((element) => {
        return(
            <tr>
                <td>
                    <button onClick={/*props.function that makes a PUT request and changes state of Quantity Remaining*/} />
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