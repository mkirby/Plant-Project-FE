import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Signup from "./Components/Signup"
import Login from "./Components/Login"


class App extends React.Component {
    
    state = {
        user: null
    }
    
    signupHandler = (userObj) => {
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json'
            },
            body: JSON.stringify({ user: userObj})
        })
        .then(response => response.json())
        .then(console.log)
    }
    
    loginHandler = (userObj) => {
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json'
            },
            body: JSON.stringify({ user: userObj})
        })
        .then(response => response.json())
        .then(data => this.setState({user: data.user})) /* () => this.props.history.push("/plants") */
    }
    
    render() {
        return (
            <div className="App">                
                <h1>Plant App</h1>
                {/* header components here*/}
                
                <BrowserRouter>
                    <Switch>
                        <Route path ="/signup" render={ () => <Signup submitHandler={this.signupHandler} /> } />
                        <Route path ="/login" render={ () => <Login submitHandler={this.loginHandler} /> } />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
