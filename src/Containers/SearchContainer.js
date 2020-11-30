import React from 'react'
import SearchForm from '../Components/SearchForm'
import PlantCard from '../Components/PlantCard'

class SearchContainer extends React.Component {
    
    state = {
        queryResults: []
    }
    
    searchHandler = (query) => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/search?q=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(apiResponse => this.setState({queryResults: apiResponse.api_data.data}, () => console.log(apiResponse)))
    }
        
    render() {
        return(
                <>
                    <h1>Search</h1>
                    {this.props.user ? <SearchForm searchHandler={this.searchHandler}/> : <p>Please log in</p>}
                    {this.renderPlantResults()}
                </>
        )
    }

    renderPlantResults = () => {
        return this.state.queryResults.map(plant => <PlantCard key={plant.id} plant={plant}/>)
    }
}

export default SearchContainer