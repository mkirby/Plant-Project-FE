import React from 'react'

class PlantCard extends React.Component {
  
  render() {
    const plant = this.props.plant
    return (
      <div className="plant-card">
        {plant.image_url ? <img src={plant.image_url} alt={plant.common_name} height="100" /> : null}
        <h3>{plant.common_name}</h3>
        <p>Scientific Name: <em>{plant.scientific_name}</em></p>
        <p>Genus: {plant.genus}</p>
        <button onClick={() => this.props.renderModal(plant)}>more info</button>
      </div>
    )
  }
}

export default PlantCard