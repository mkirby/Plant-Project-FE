import React from 'react'

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }
    
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    submitHandler = (event) => {
        event.preventDefault()
        this.props.submitHandler(this.state)
    }
    
    render() {
        return(
            <form onSubmit={this.submitHandler}>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} /><br/>
                <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br/>
                <input type="submit" value="Log In" />
            </form>
        )
    }
}

export default Login