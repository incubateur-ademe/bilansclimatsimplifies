import React from 'react'
import { Button, ButtonGroup } from '@dataesr/react-dsfr'
import MagicLink from 'components/base/MagicLink'
import { useKeycloak } from '@react-keycloak/web'

export default function AdemeLoginButton() {
  const { keycloak, initialized } = useKeycloak()

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
        <Button onClick={keycloak.login} size='lg'>
          M'inscrire ou me connecter
        </Button>
      )}
    </ButtonGroup>
  ) : null
}
