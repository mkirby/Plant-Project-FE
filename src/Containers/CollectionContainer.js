import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import UserPlantCard from '../Components/UserPlantCard'

class CollectionContainer extends React.Component {

  render() {
    return (
      <div className="collection-container">
        <h2>Plant Collection</h2>
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
                    // TODO decide what to render is user_plant odesn't exist
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
    return this.props.user.user_plants.map(plant => <UserPlantCard key={plant.id} plant={plant} updateUser={this.props.updateUser}/>)
  }

}

export default withRouter(CollectionContainer)