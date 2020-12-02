import React from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'
import './App.css';
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"
import SearchContainer from "./Containers/SearchContainer"
import CollectionContainer from './Containers/CollectionContainer';

class App extends React.Component {

  state = {
    user: null
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.json())
      .then(data => {
        this.setState({user: data.user})
      })
    } else {
      this.props.history.push("/login")
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
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({user: data.user})
      this.props.history.push("/search")
    })
  }
  
  loginHandler = (userObj) => {
    const token = localStorage.getItem("token")
    if (token) {
      this.props.history.push("/")
    } else {
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
        this.setState({user: data.user})
        this.props.history.push("/collection")
      })
    }
  }
  
  logoutHandler = () => {
    localStorage.removeItem("token")
    this.setState({user: null})
    this.props.history.push("/")
  }

  updateUser = () => {
    const token = localStorage.getItem("token")
    fetch('http://localhost:3000/api/v1/profile', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.json())
    .then(data => {
      this.setState({user: data.user})
      this.props.history.push("/collection")
    })
  }
  
  render() {
    return (
        <div className="App">
          <Navbar user={this.state.user} logoutHandler={this.logoutHandler}/>
          <main>
            <Switch>
              <Route path ="/signup" render={ () => <Signup submitHandler={this.signupHandler} /> } />
              <Route path ="/login" render={ () => <Login submitHandler={this.loginHandler} /> } />
              <Route path ="/search" render={ () => <SearchContainer user={this.state.user} updateUser={this.updateUser}/> } />
              <Route path="/collection" render={ () => <CollectionContainer user={this.state.user} updateUser={this.updateUser}/>} />
            </Switch>
          </main>
          <footer>
            <p>A Brian Feldman and Matthew Kirby App</p>
          </footer>
        </div>
    );
  }
}

export default withRouter(App);
