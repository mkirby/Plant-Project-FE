import React from 'react'
import { Route, Switch} from 'react-router-dom'
import SearchForm from '../Components/SearchForm'
import PlantCard from '../Components/PlantCard'
import PlantProfile from '../Containers/PlantProfile'

import Modal from '../Components/Modal'


class SearchContainer extends React.Component {

    state = {
        queryResults: [],
        visibleModal: false,
        modalPlant: ""
    }
    
    renderModal = (plantSlug) => {
        this.setState({visibleModal: true, modalPlant: plantSlug})
    }
    
    hideModal = () => {
        this.setState({visibleModal: false, modalPlant: ""})
    }

    searchHandler = (query) => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/search?q=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(apiResponse => {
            this.setState({queryResults: apiResponse.api_data.data})
        })
    }
    
    renderPlantResults = () => {
        return this.state.queryResults.map(plant => 
            <PlantCard key={plant.id} plant={plant} renderModal={this.renderModal} />
        )
    }

    
    render() {
        return(
                <div id="search-container">
                    <h1>Search</h1>
                    {this.props.user ? <SearchForm searchHandler={this.searchHandler}/> : <p>Please log in</p>}
                    
                    {this.state.visibleModal ? <Modal plant={this.state.modalPlant} hideModal={this.hideModal} /> : null }
                    
                    <Switch>
                        <Route path="/search/:apiSlug" render={({match}) => {
                                return <PlantProfile slug={match.params.apiSlug} />
                            }
                        }/>
                        <Route path="/search" render={ () => this.renderPlantResults() } />
                    </Switch>
                </div>
        )
    }
}

export default SearchContainer