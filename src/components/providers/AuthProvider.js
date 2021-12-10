import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import keycloak from 'utils/keycloak'
import { useLoginUser } from 'hooks/useUser'

export default function ModalProvider(props) {
  const [token, setToken] = useState(sessionStorage.getItem('token'))

  const mutation = useLoginUser()

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      sessionStorage.removeItem('token')
      axios.defaults.headers.common['Authorization'] = ``
    }
  }, [token])

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        flow: 'standard',
        pkceMethod: 'S256',
      }}
      onTokens={(tokens) => {
        setToken(tokens.token)
        tokens.token && mutation.mutate(tokens.token)
      }}
    >
      {props.children}
    </ReactKeycloakProvider>
  )
}
