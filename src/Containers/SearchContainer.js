import React from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import SearchForm from '../Components/SearchForm'
import PlantCard from '../Components/PlantCard'
import Modal from '../Components/Modal'

class SearchContainer extends React.Component {

    state = {
        queryResults: [],
        visibleModal: false,
        modalPlant: "",
        stagingArray: []
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
            <PlantCard
                key={plant.id}
                plant={plant}
                renderModal={this.renderModal}
                handlePlantStaging={this.handlePlantStaging}
            />
        )
    }
    
    handlePlantStaging = (plantObj) => {
        let stagingArray = this.state.stagingArray
        if (!stagingArray.includes(plantObj)) {
            stagingArray = stagingArray.concat(plantObj)
            this.setState({stagingArray})
        } else {
            stagingArray = stagingArray.filter(plant => plant !== plantObj)
            this.setState({stagingArray})
        }
    }
    
    addPlantsToCollection = () => {
        const plantArray = this.state.stagingArray
        plantArray.forEach(plant => {
            this.postPlant(plant)
            .then(plantObj => {
                this.postUserPlant(plantObj.plant.id, this.props.user.id)
                .then(() => {})
            })
        })
        this.props.updateUser();
    }

    postUserPlant = (plantId, userId) => {
        console.log("plant id:", plantId, "userId", userId)
        const token = localStorage.getItem("token")
        const newUserPlant = {
            user_id: userId,
            plant_id: plantId,
            nickname: ""
        }
        return fetch(`http://localhost:3000/api/v1/user_plants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newUserPlant)
        })
        .then(response => response.json())
    }

    postPlant = (plant) => {
        const token = localStorage.getItem("token")
        const newPlant = {
            api_id: plant.id,
            slug: plant.slug
        }
        return fetch(`http://localhost:3000/api/v1/plants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newPlant)
        })
        .then(response => response.json())
    }
    
    render() {
        return(
            <div className="search-container">
                <div className="search-filters">
                    <h1>Search</h1>
                    {this.props.user ? <SearchForm searchHandler={this.searchHandler}/> : <p>Please log in</p>}
                </div>
                {this.state.visibleModal ? <Modal plant={this.state.modalPlant} hideModal={this.hideModal} /> : null }
                
                {this.state.stagingArray.length > 0 ? <button onClick={this.addPlantsToCollection}>ADD ALL TO COLLECTION</button> : null}
                
                <Switch>
                    {/* <Route path="/search/:apiSlug" render={({match}) => {
                            return <div className="plant-profile-div">
                                <PlantProfile slug={match.params.apiSlug} />
                            </div>
                        }
                    }/> */}
                    <Route path="/search" render={ () => {
                        return <div className="search-results-div">
                            {this.renderPlantResults()}
                        </div>
                    }} />
                </Switch>
            </div>
        )
    }
}

export default SearchContainer