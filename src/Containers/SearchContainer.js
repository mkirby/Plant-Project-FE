import React from 'react'

class SearchContainer extends React.Component {
    
    state = {
        searchSelection: []
    }
        
    render() {
        console.log("SEARCHING AS USER: ", this.props.user)
        return(
                <>
                <h1>Search</h1>
                    {this.props.user ? <p>Logged in</p> : <p>not logged in</p>}
                </>
        )
    }
}

export default SearchContainer