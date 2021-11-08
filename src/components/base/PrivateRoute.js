import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from 'utils/AuthContext'

export default function PrivateRoute({ children, ...rest }) {
  const { token } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
