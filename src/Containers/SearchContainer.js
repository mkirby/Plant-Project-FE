import React from 'react'
import SearchForm from '../Components/SearchForm'
import PlantCard from '../Components/PlantCard'
import PlantShowModal from '../Components/PlantShowModal'

class SearchContainer extends React.Component {

    state = {
        queryResults: [],
        visibleModal: false,
        modalPlantSlug: "",
        stagingArray: []
    }
    
    renderModal = (slug) => {
        this.setState({visibleModal: true, modalPlantSlug: slug})
    }
    
    hideModal = () => {
        this.setState({visibleModal: false, modalPlantSlug: ""})
    }

    searchHandler = (query) => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/search?q=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(fetchData => {
            this.setState({queryResults: fetchData.api.data})
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
            })
        })
        this.props.updateUser();
    }

    postUserPlant = (plantId, userId) => {
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

    renderMiniImages = () => {
        return 
    }
    
    render() {
        return(
            <div className="search-container">
                <div className="search-filters">
                    <h1>Find Plants</h1>
                    {this.props.user ? <SearchForm searchHandler={this.searchHandler}/> : <p>Please log in</p>}
                </div>
                {this.state.visibleModal ? <PlantShowModal slug={this.state.modalPlantSlug} hideModal={this.hideModal} /> : null }

                {this.state.stagingArray.length > 0 ?
                    <div className="add-to-collection-div">
                        <div className="add-to-collection-images">
                            {/* render small images */}
                            {this.renderMiniImages}
                        </div>
                        <div className="add-to-collection-controls">
                            <button onClick={this.addPlantsToCollection}>ADD ALL TO COLLECTION</button>
                        </div>
                    </div>
                    :
                    null
                }
                
                <div className="search-results-div">
                    {this.renderPlantResults()}
                </div>
            </div>
        )
    }
}

export default SearchContainer