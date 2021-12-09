import React, { useContext } from 'react'
import { Button, ButtonGroup } from '@dataesr/react-dsfr'
import MagicLink from 'components/base/MagicLink'
import { useKeycloak } from '@react-keycloak/web'

import axios from 'axios'
import { useCsrfToken } from 'hooks/useUser'
import apiUrl from 'utils/apiUrl'
import AuthContext from 'utils/AuthContext'

export default function AdemeLoginButton() {
  const { keycloak, initialized } = useKeycloak()
  const { token } = useContext(AuthContext)
  const { data: csrfToken } = useCsrfToken()

  if (keycloak.authenticated && keycloak.token && !token) {
    axios.post(
      `${apiUrl}/ademeUser/`,
      { token: keycloak.token },
      {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        // faut que le header auth soit vide car l'utilisateur peut ne pas être déjà créé
        headers: { Authorization: '' },
      }
    )
  }

  return initialized ? (
    <ButtonGroup isInlineFrom='md' align='center'>
      {keycloak.authenticated ? (
        <>
          <Button secondary onClick={keycloak.logout}>
            Me deconnecter
          </Button>

          <MagicLink to='/bilans'>
            <Button>Voir mes bilans</Button>
          </MagicLink>
        </>
      ) : (
        <Button onClick={keycloak.login}>M'inscrire ou me connecter</Button>
      )}
    </ButtonGroup>
  ) : null
}
