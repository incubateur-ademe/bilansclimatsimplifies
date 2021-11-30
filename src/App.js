import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import axios from 'axios'

import AuthProvider from 'components/providers/AuthProvider'
import PrivateRoute from 'components/base/PrivateRoute'
import Web from 'components/layout/Web'
import Home from 'views/Home'
import NewBilan from 'views/NewBilan'
import EditBilan from 'views/EditBilan'
import TypeBilan from 'views/TypeBilan'
import Poste from 'views/Poste'
import Bilans from 'views/Bilans'
import Bilan from 'views/Bilan'
import Login from 'views/Login'

const queryClient = new QueryClient()

function App() {
  const initOptions = {
    flow: 'standard',
    pkceMethod: 'S256',
  }
  const onKeycloakEvent = (event, error) => {
    // temporary logging to have visibility of keycloak events
    console.log('onKeycloakEvent', event, error)
  }
  const onTokens = (tokens) => {
    const token = tokens.token
    console.log("onTokens token", token) // temporary for debugging
    if(token) {
      sessionStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      sessionStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} onEvent={onKeycloakEvent} onTokens={onTokens}>
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
                <PrivateRoute path='/bilans/:id/:poste'>
                  <Poste />
                </PrivateRoute>
                <PrivateRoute path='/bilans/:id'>
                  <Bilan />
                </PrivateRoute>
                <PrivateRoute path='/bilans'>
                  <Bilans />
                </PrivateRoute>
                <Route path='/login'>
                  <Login />
                </Route>
                <Route path='/'>
                  <Home />
                </Route>
              </Switch>
            </Web>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </ReactKeycloakProvider>
  )
}

export default App
