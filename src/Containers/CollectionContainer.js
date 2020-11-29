import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import PlantShowContainer from './PlantShowContainer'
import UserPlantCard from '../Components/UserPlantCard'

class CollectionContainer extends React.Component {

  render() {
    return (
      <div className="collection-container">
        <h2>Collection Container</h2>
        {localStorage.getItem("token") ?
          <>
            {this.props.user ?
              <>
                <Switch>
                  <Route path="/collection/:user_plant_id" render={({match}) => {
                    // let user_plant_id = parseInt(match.params.user_plant_id)
                    // let userPlant = TODO
                    return <PlantShowContainer />
                  }} />
                  <Route path="/collection" render={() => {
                    return (
                      <div>
                        <p>Logged In: Entire Collection Page</p>
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
    // map over user plants and create cards
    // TODO change to iteration to real data
    const testPlantNicknames = ["Planty", "Sprout", "Planty Jr.", "Ms. Prickly"]
    return testPlantNicknames.map(nickname => <UserPlantCard nickname={nickname}/>)
  }

}

export default withRouter(CollectionContainer)