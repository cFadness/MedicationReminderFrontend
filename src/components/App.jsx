import React, {Component} from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NotFoundPage from './NotFound/NotFoundPage';
import NavBar from './NavBar/NavBar';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentUser: null
        }

    }

    componentDidMount(){
       this.checkUser()
    }

    checkUser=()=>{
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

    render() {
        return(
            <div>
                <NavBar currentUser={this.state.currentUser} />
                <Switch>
                    <Route path='/' exact render={props => {
                        if (!this.state.currentUser){
                            return <Redirect to='/register' />
                        } else {
                            return <Redirect to='/yourMedications' />
                        }
                    }}
                    />
                    <Route path='/notFound' component={NotFoundPage} />
                    <Redirect to='/notFound' />
                </Switch>
            </div>
        );
    }
}


export default App;