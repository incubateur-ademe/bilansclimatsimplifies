import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useLocalToken } from 'hooks/useUser'

export default function PrivateRoute({ children, ...rest }) {
  const { token } = useLocalToken()

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
