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
            <form className="search-form">
                <input type="text" name="query" placeholder="Plant Name" value={this.state.query} onChange={this.changeHandler} />
                <button onClick={this.localSearchHandler}>Search</button>
            </form>
        )
    }
}

export default Login