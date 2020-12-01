import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import PlantShowContainer from './PlantShowContainer'
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
                          <PlantShowContainer plant={plant[0]}/>
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
    // const testPlantNicknames = ["Planty", "Sprout", "Planty Jr.", "Ms. Prickly"]
    // return testPlantNicknames.map((nickname, index) => <UserPlantCard key={index} nickname={nickname}/>)
    return this.props.user.user_plants.map(plant => <UserPlantCard key={plant.id} nickname={plant.nickname} plant={plant}/>)
  }

}

export default withRouter(CollectionContainer)