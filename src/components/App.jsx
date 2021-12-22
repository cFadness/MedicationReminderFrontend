import React, {Component} from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NotFoundPage from './NotFound/NotFoundPage';
import NavBar from './NavBar/NavBar';
import RegisterPage from './Register/RegisterPage';
import LoginPage from './Login/LoginPage';
import YourMedicationsPage from './YourMedications/YourMedicationsPage';
import UpdateMedicationPage from "./UpdateMedication/UpdateMedicationPage";


class App extends Component {

    constructor(props){
        super(props);

        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            this.state = {
                currentUser: user
            };
            
        }
        catch(err){
            this.state = {
                currentUser: null
            };
        }

    }

    componentDidMount(){
        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            this.setState({
                currentUser: user
            });
            
        }
        catch(err){
            console.log("Error decoding token", err);
            this.setState({
                currentUser: null
            });
        }
    }

    // checkUser=()=>{
    //     const jwt = localStorage.getItem('token');
    //     try{
    //         const user = jwtDecode(jwt);
    //         this.setState({
    //             currentUser: user
    //         });
            
    //     }
    //     catch(err){
    //         console.log("Error decoding token", err);
    //         this.setState({
    //             currentUser: null
    //         });
    //     }
    // }

    render() {
        return(
            <div>
                <NavBar currentUser={this.state.currentUser} />
                <Switch>
                    <Route path='/' exact render={() => {
                        if (!this.state.currentUser){
                            return <Redirect to='/login' />
                        } else {
                            return <Redirect to='/yourMedications' />
                        }
                    }}
                    />
                    <Route path='/updateMedications' component={UpdateMedicationPage} />
                    <Route path='/yourMedications' component={YourMedicationsPage} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/notFound' component={NotFoundPage} />
                    <Redirect to='/notFound' />
                </Switch>
            </div>
        );
    }
}


export default App;