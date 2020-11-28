import React from 'react'

class Signup extends React.Component {
    state = {
        username: "",
        password: "",
        name: ""
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
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler} /><br/>
                <input type="submit" value="sign up" />
            </form>
        )
    }
}

export default Signup