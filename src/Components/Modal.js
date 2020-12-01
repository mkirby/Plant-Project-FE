import React from 'react'
import '../App.css'

class Modal extends React.Component {
    
    render() {
        const plant = this.props.plant
        return(
            <div id="plant-modal" onClick={this.props.hideModal}>
                <div id="modal-content">
                    <h1>{plant.common_name}</h1>
                    {plant.image_url ? <img src={plant.image_url} alt={plant.common_name} height="200" /> : null}
                    <p>Scientific Name: {plant.scientific_name}</p>
                    {plant.year ? <p>Year discovered: {plant.year}</p> : null }
                </div>
            </div>
        )
    }

}

export default Modal