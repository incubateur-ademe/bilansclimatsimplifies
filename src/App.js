import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import PrivateRoute from 'components/base/PrivateRoute'
import Web from 'components/layout/Web'
import Home from 'views/Home'
import NewBilan from 'views/NewBilan'
import Poste from 'views/Poste'
import Bilans from 'views/Bilans'
import Bilan from 'views/Bilan'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Web>
          <Switch>
            <PrivateRoute path='/bilans/nouveau'>
              <NewBilan />
            </PrivateRoute>
            <PrivateRoute path='/bilans/:id/:poste'>
              <Poste />
            </PrivateRoute>
            <PrivateRoute path='/bilans/:id'>
              <Bilan />
            </PrivateRoute>
            <PrivateRoute path='/bilans'>
              <Bilans />
            </PrivateRoute>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Web>
      </QueryClientProvider>
    </Router>
  )
}

export default App
