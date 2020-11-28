import React from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import './App.css';
import Signup from "./Components/Signup"
import Login from "./Components/Login"


class App extends React.Component {
    
    state = {
        user: null
    }
    
    componentDidMount() {
        const token = localStorage.getItem("token")
        if (token) {
            fetch('http://localhost:3000/api/v1/users', {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                })
            .then(response => response.json())
            .then(data => this.setState({user: data.user}, () => console.log("CURRENT USER: ", this.state.user)))
        } else {
            this.props.history.push("/signup")
        }
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
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.setState({user: data.user}, () => console.log("localStorage token:", localStorage.getItem("token")))
        })
    }
    
    render() {
        console.log(this.props.history)
        return (
            <BrowserRouter>
                <div className="App">
                    <h1>Plant App</h1>
                    {/* header components here*/}
                    <Switch>
                        <Route path ="/signup" render={ () => <Signup submitHandler={this.signupHandler} /> } />
                        <Route path ="/login" render={ () => <Login submitHandler={this.loginHandler} /> } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
