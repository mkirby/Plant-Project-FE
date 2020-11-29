import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

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
                    // return <PlantContainer userPlant={userPlant}
                    return <p>Logged In: Singe Plant Page</p>
                  }} />
                  <Route path="/collection" render={() => {
                    return <p>Logged In: Entire Collection Page</p>
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
}

export default withRouter(CollectionContainer)