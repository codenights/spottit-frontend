import React from 'react'
import { Router, Switch, Redirect, Route } from 'react-router-dom'

import { useHistory } from '../../hooks/useHistory'
import { Theme } from '../../ui/Theme'
import { AppBar } from '../AppBar'

const Oauth2Router = React.lazy(() => import('../Oauth2'))
const NewSpotRouter = React.lazy(() => import('../NewSpot'))
const SpotsMapRouter = React.lazy(() => import('../SpotsMap'))

export interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const history = useHistory()

  return (
    <Theme>
      <Router history={history}>
        <React.Suspense fallback={null}>
          <AppBar />
          <Switch>
            <Route exact path="/oauth2/callback" component={Oauth2Router} />
            <Route exact path="/s/new" component={NewSpotRouter} />
            <Route path="/s" component={SpotsMapRouter} />

            <Redirect to="/s" />
          </Switch>
        </React.Suspense>
      </Router>
    </Theme>
  )
}
