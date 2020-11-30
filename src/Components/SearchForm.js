import React from 'react'

class Login extends React.Component {
    state = {
        query: ""
    }
    
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    localSearchHandler = (event) => {
        event.preventDefault()
        this.props.searchHandler(this.state.query)
    }
    
    render() {
        return(
            <form onSubmit={this.localSearchHandler}>
                <input type="text" name="query" placeholder="search for a plant" value={this.state.query} onChange={this.changeHandler} /><br/>
                <input type="submit" value="Search" />
            </form>
        )
    }
}

export default Login