import React from 'react'

class UserPlantCard extends React.Component {
  
  state = {
    plant: null,
    nickname: this.props.userPlant.nickname,
    editing: false 
  }
    
  componentDidMount() {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/search/${this.props.userPlant.plant.slug}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(fetchData => this.setState({plant: fetchData.api.data}))
  }

  removePlant = () => {
    const token = localStorage.getItem("token")
    console.log("plant id?", this.state.plant.id)
    fetch(`http://localhost:3000/api/v1/user_plants/${this.state.plant.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(() => {
      console.log("user plant deleted")
      this.props.updateUser()
    })
  }
  
  renamePlant = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/user_plants/${this.props.userPlant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({nickname: this.state.nickname})
    })
    .then(response => response.json())
    .then(data => {
      console.log("EDIT:", data)
      this.setState({editing: false})
    })
  }
  
  startEdit = () => {
    this.setState({editing: true})
  }
  
  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="plant-card">
        
        <div className="plant-card-img">
        {  this.state.plant ?
          <img src={this.state.plant.image_url} alt={this.state.plant.common_name} />
          :
          <img
            src={"https://static.patchplants.com/img/placeholders/patch_placeholder_grey.png"}
            alt={"missing"}
            style={{"maxHeight": "100%"}}/>}
        </div>
        
        <div className="plant-card-data">
          
            {/* NICKNAME EDITING FORM*/}
            {this.state.editing ?
              <>
                <input type="text" name="nickname" value={this.state.nickname} onChange={this.changeHandler} />
                <button onClick={this.renamePlant}>save</button>
              </>
            :
              null
            }
            
            {this.state.nickname.length > 0 ?
                <h2 onClick={this.startEdit}>
                  {this.state.nickname}
                </h2>
            : 
              <p onClick={this.startEdit}>no nickname</p>
            }
          
          {this.state.plant ? <h3>{this.state.plant.common_name}</h3> : <h3>Loading...</h3>}
          {this.state.plant ? <p><strong>Scientific Name:</strong> <em>{this.state.plant.scientific_name}</em></p> : null}
          {this.state.plant ? <p><strong>Family:</strong> {this.state.plant.family.name}</p> : null}
          <button onClick={() => this.props.renderModal(this.props.userPlant.plant.slug)}>More Info</button><br/>
        </div>
        
      </div>
    )
  }
}

export default UserPlantCard