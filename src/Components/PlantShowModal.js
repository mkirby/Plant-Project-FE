import React from 'react'

class PlantShowModal extends React.Component {
    
    state = {
        plant: null
    }
    
    componentDidMount() {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/search/${this.props.slug}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(fetchData => this.setState({plant: fetchData.api.data}))
    }
    
    render() {
        const plant = this.state.plant
        return(
            <div id="plant-modal" onClick={this.props.hideModal}>
                
                {this.state.plant ?
                    <div id="modal-content">
                        <div className="modal-content-image">
                            {plant.image_url ?
                            <img src={plant.image_url} alt={plant.common_name} />
                            :
                            <img
                                src={"https://static.patchplants.com/img/placeholders/patch_placeholder_grey.png"}
                                alt={"missing"}
                                style={{"maxHeight": "100%"}}/>}
                        </div>
                        <div className="modal-content-data">
                            {plant.common_name ? <h3>{plant.common_name}</h3> : <h3>{plant.scientific_name}</h3>}
                            <p><strong>Scientific Name:</strong> {plant.scientific_name}</p>
                            {plant.genus ? <p><strong>Genus:</strong> {plant.genus.name}</p> : null }
                            {plant.family ? <p><strong>Family:</strong> {plant.family.common_name} ({plant.family.name})</p> : null }
                            {plant.year ? <p><strong>Discovered:</strong> {plant.year}</p> : null }
                        </div>
                        <div className="modal-footer-1">
                            <h4>Other Common Names:</h4>
                            {this.renderPlantCommonNames()}
                        </div>
                        <div className="modal-footer-2">
                            <h4>Native to:</h4>
                            {this.renderPlantNativeTo()}
                        </div>
                    </div>
                :
                <div className="loading">Loading...</div>}
            </div>
        )
    }

    renderPlantCommonNames = () => {
        const {main_species} = this.state.plant
        if (main_species && main_species.common_names && main_species.common_names.en) {
            const nameLis = main_species.common_names.en.map((name, index) => <li key={index}>{name}</li>)
            return(
                <ul>
                    {nameLis}
                </ul>
            )
        }
    }
    
    renderPlantNativeTo = () => {
        const {main_species} = this.state.plant
        if (main_species && main_species.distribution && main_species.distribution.native) {
            const localeLis = main_species.distribution.native.map((locale, index) => <li key={index}>{locale}</li>)
            return(
                <ul>
                    {localeLis}
                </ul>
            )
        }
    }
}

export default PlantShowModal