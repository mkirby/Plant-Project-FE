import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

class CollectionContainer extends React.Component {

  render() {
    return (
      <div className="collection-container">
        <h2>Collection Container</h2>

        {/* Does a token exist? */}
        {localStorage.getItem("token") ?

          <>
            {/* TODO If a user is logged in render their collection */}
            <Switch>
              <Route path="/collection/:user_plant_id" render={({match}) => {
                // let user_plant_id = parseInt(match.params.id)
                // let userPlant = this.state.userPlants.find(inst => inst.id === user_plant_id)
                // return <PlantContainer userPlant={userPlant}
                return <p>Logged In: Singe Plant Page</p>
              }} />
              <Route path="/collection" render={() => {
                return <p>Logged In: Entire Collection Page</p>
              }}/>
            </Switch>
          </>
          :
          // no token in localStorage, then redirect to login
          <Redirect to="/login" />
        }
      </div>
    )
  }
}

export default withRouter(CollectionContainer)