import React, { useState } from 'react'
import { useKeycloak } from '@react-keycloak/web'

import axios from 'axios'
import { useCsrfToken } from 'hooks/useUser'
import apiUrl from 'utils/apiUrl'
import { Redirect } from 'react-router'

import { Button } from '@dataesr/react-dsfr'

export default function Login() {
  const [endpointStatus, setEndpointStatus] = useState('uncalled')

  const { keycloak, initialized } = useKeycloak()
  console.log("k auth", keycloak.authenticated)
  console.log("token", keycloak.token)

  const { data: csrfToken } = useCsrfToken()
  if(keycloak.authenticated && keycloak.token) {
    axios.post(`${apiUrl}/ademeUser/`, {token: keycloak.token}, {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
      // faut que le header auth soit vide car l'utilisateur peut ne pas être déjà créé
      headers: { 'Authorization': '' }
    }).then(() => {
      // n'utilise pas setToken - c'est fait par onTokens
      setEndpointStatus('success')
    })
    .catch(() => {
      setEndpointStatus('error')
    })
  }

  return <div>
    {keycloak && !keycloak.authenticated &&
        <div>
          <p>You are not logged in</p>
          {initialized && !keycloak.authenticated && <Button onClick={() => keycloak.login()}>Login</Button>}
        </div>
    }
    {keycloak && keycloak.authenticated &&
        <div>
            <p>Redirecting...</p>
            {(endpointStatus === 'success') && <Redirect to="/bilans" />}
        </div>
    }
  </div>
}
