import React, { useContext } from 'react'
import { Button, ButtonGroup } from '@dataesr/react-dsfr'
import MagicLink from 'components/base/MagicLink'

import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'
import { useCsrfToken } from 'hooks/useUser'
import apiUrl from 'utils/apiUrl'
import AuthContext from 'utils/AuthContext'


export default function ContactForm() {
  const { keycloak, initialized } = useKeycloak()
  const { token } = useContext(AuthContext)
  const { data: csrfToken } = useCsrfToken()

  if(keycloak.authenticated && keycloak.token && !token) {
    axios.post(`${apiUrl}/ademeUser/`, {token: keycloak.token}, {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
      // faut que le header auth soit vide car l'utilisateur peut ne pas être déjà créé
      headers: { 'Authorization': '' }
    })
  }

  return keycloak.authenticated ? (
    <ButtonGroup isInlineFrom='md' align='center'>
      {initialized && keycloak.authenticated && <Button secondary onClick={() => keycloak.logout()}>Logout</Button>}
      <MagicLink to='/bilans'>
        <Button>Voir mes bilans</Button>
      </MagicLink>
    </ButtonGroup>
  ) : (
    <ButtonGroup isInlineFrom='md' align='center'>
      {initialized && !keycloak.authenticated && <Button onClick={() => keycloak.login()}>S'inscrire ou se connecter</Button>}
    </ButtonGroup>
  )
}
