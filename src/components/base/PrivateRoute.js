import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ children, ...rest }) {
  const hasToken = !!sessionStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasToken ? (
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
