import React from 'react'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'
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
        <h1>Plant Collection</h1>
        
        {this.state.visibleModal ? <PlantShowModal slug={this.state.modalPlantSlug} hideModal={this.hideModal} /> : null }
        
        {localStorage.getItem("token") ?
          <>
            {this.props.user ?
              <>
                <Switch>
                  <Route path="/collection" render={() => {
                    return (
                      <div className="collection-div">
                        {this.props.user.user_plants.length > 0 ? this.renderUserPlantCards() : <p>No Plants Yet! <Link to="/search">Search for Plants</Link></p>}
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