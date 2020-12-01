import React from 'react'

class PlantCard extends React.Component {
  
  state = {
    selected: false
  }
  
  handleCheckboxChange = () => {
    this.setState({selected: !this.state.selected})
    this.props.handlePlantStaging(this.props.plant)
  }
  
  render() {
    const { plant } = this.props
    console.log("plant card plant:", plant)
    return (
      <div className="plant-card">
        {plant.image_url ? <img src={plant.image_url} alt={plant.common_name} height="100" /> : null}
        <h3>{plant.common_name}</h3>
        <p>Scientific Name: <em>{plant.scientific_name}</em></p>
        <p>Genus: {plant.genus}</p>
        <button onClick={() => this.props.renderModal(plant.slug)}>more info</button><br/>
        <p>Add to collection?</p> <input name="selected" type="checkbox" checked={this.state.selected} onChange={this.handleCheckboxChange} />
      </div>
    )
  }
}

export default PlantCard