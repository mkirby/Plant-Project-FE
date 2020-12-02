import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import UserPlantCard from '../Components/UserPlantCard'
import PlantShowModal from '../Components/PlantShowModal'


class CollectionContainer extends React.Component {

  state = {
    visibleModal: false,
    modalPlantSlug: ""
  }

  renderModal = (slug) => {
    this.setState({visibleModal: true, modalPlantSlug: slug})
  }
  
  hideModal = () => {
      this.setState({visibleModal: false, modalPlantSlug: ""})
  }

  render() {
    return (
      <div className="collection-container">
        <h2>Plant Collection</h2>
        
        {this.state.visibleModal ? <PlantShowModal slug={this.state.modalPlantSlug} hideModal={this.hideModal} /> : null }
        
        {localStorage.getItem("token") ?
          <>
            {this.props.user ?
              <>
                <Switch>
                  <Route path="/collection/:user_plant_id" render={({match}) => {
                    let user_plant_id = parseInt(match.params.user_plant_id)
                    let plant = this.props.user.user_plants.filter(plant => plant.id === user_plant_id)
                    if (plant.length !== 0) {
                      return <div className="show-user-plant">
                          {/* TODO render Modal for single */}
                          <p>Logged In: Single PlantShowContainer Page</p>
                        </div>
                    }
                    // TODO decide what to render if user_plant doesn't exist
                    return <p>Plant doesn't exist</p>
                  }} />
                  <Route path="/collection" render={() => {
                    return (
                      <div className="collection-div">
                        {this.renderUserPlantCards()}
                      </div>
                    )
                  }}/>
                </Switch>
              </>
              :
              <p>Loading...</p>
            }
          </>
          :
          // no token in localStorage, then redirect to login
          <Redirect to="/login" />
        }
      </div>
    )
  }

  renderUserPlantCards = () => {
    return this.props.user.user_plants.map(plant => <UserPlantCard key={plant.id} userPlant={plant} updateUser={this.props.updateUser} renderModal={this.renderModal}/>)
  }

}

export default withRouter(CollectionContainer)