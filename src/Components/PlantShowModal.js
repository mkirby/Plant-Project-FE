import React from 'react'

class PlantShowModal extends React.Component {
    
    state = {
        plant: null
    }
    
    componentDidMount() {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/search/${this.props.slug}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(fetchData => this.setState({plant: fetchData.api.data}))
    }
    
    render() {
        const plant = this.state.plant
        return(
            <div id="plant-modal" onClick={this.props.hideModal}>
                <div id="modal-content">
                    {this.state.plant ?
                        <>
                            {plant.image_url ? <img src={plant.image_url} alt={plant.common_name} height="200" /> : null}
                            <h3>{plant.common_name}</h3>
                            <p>Scientific Name: {plant.scientific_name}</p>
                            {plant.genus ? <p>Genus: {plant.genus.name}</p> : null }
                            {plant.family ? <p>Family: {plant.family.name}</p> : null }
                            {plant.year ? <p>Year discovered: {plant.year}</p> : null }
                            
                            {this.renderPlantNames()}
                            {this.renderplantNativeTo()}
                        </>
                    :
                    <p>Loading...</p>}
                </div>
            </div>
        )
    }

    renderPlantNames = () => {
        if (this.state.plant.main_species) {
            if (this.state.plant.main_species.common_names) {
                const nameLis = this.state.plant.main_species.common_names.en.map((name, index) => <li key={index}>{name}</li>)
                return(
                    <div>
                        <h4>Common names</h4>
                        <ul>
                            {nameLis}
                        </ul>
                    </div>
                )
            }
        }
    }
    
    renderplantNativeTo = () => {
        if (this.state.plant.main_species) {
            if (this.state.plant.main_species.distribution.native) {
                const localeLis = this.state.plant.main_species.distribution.native.map((locale, index) => <li key={index}>{locale}</li>)
                return(
                    <div>
                        <h4>Native to</h4>
                        <ul>
                            {localeLis}
                        </ul>
                    </div>
                )
            }
        }
    }
}

export default PlantShowModal