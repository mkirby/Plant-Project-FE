import React from 'react'
import SearchForm from '../Components/SearchForm'

class SearchContainer extends React.Component {
    
    state = {
        searchSelection: []
    }
    
    searchHandler = (query) => {
        console.log(query)
    }
        
    render() {
        console.log("SEARCHING AS USER: ", this.props.user)
        return(
                <>
                <h1>Search</h1>
                    {this.props.user ? <SearchForm searchHandler={this.searchHandler}/> : <p>Please log in</p>}
                </>
        )
    }
}

export default SearchContainer