import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import AuthProvider from 'components/providers/AuthProvider'
import PrivateRoute from 'components/base/PrivateRoute'
import Web from 'components/layout/Web'
import Home from 'views/Home'
import Contact from 'views/Contact'
import NewBilan from 'views/NewBilan'
import EditBilan from 'views/EditBilan'
import TypeBilan from 'views/TypeBilan'
import TotauxBilan from 'views/TotauxBilan'
import Poste from 'views/Poste'
import Bilans from 'views/Bilans'
import Bilan from 'views/Bilan'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Web>
            <Switch>
              <PrivateRoute path='/bilans/nouveau'>
                <NewBilan />
              </PrivateRoute>
              <PrivateRoute path='/bilans/:id/infos'>
                <EditBilan />
              </PrivateRoute>
              <PrivateRoute path='/bilans/:id/type'>
                <TypeBilan />
              </PrivateRoute>
              <PrivateRoute path='/bilans/:id/totaux'>
                <TotauxBilan />
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
              <Route path='/contact'>
                <Contact />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </Web>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  )
}

export default App
