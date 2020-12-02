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
    return (
      <div className="plant-card">
        <div className="plant-card-img">
          {plant.image_url ? <img src={plant.image_url} alt={plant.common_name} /> : <img src={"https://static.patchplants.com/img/placeholders/patch_placeholder_grey.png"} alt={"image missing"} style={{"max-height": "100%"}}/>}
        </div>
        <div className="plant-card-data">
          {plant.common_name ? <h3>{plant.common_name}</h3> : <h3>{plant.scientific_name}</h3>}
          <p><strong>Scientific Name:</strong> <em>{plant.scientific_name}</em></p>
          <p><strong>Genus:</strong> {plant.genus}</p>
          <p><strong>Family:</strong> {plant.family}</p>
          <button onClick={() => this.props.renderModal(plant.slug)}>More Info</button><br/>
        </div>
        <div className="plant-card-check">
          <p><input name="selected" type="checkbox" checked={this.state.selected} onChange={this.handleCheckboxChange} /> Add to Collection</p> 
        </div>
      </div>
    )
  }
}

export default PlantCard