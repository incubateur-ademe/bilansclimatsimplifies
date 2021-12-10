import React from 'react'
import styled from 'styled-components'
import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr'
import { useKeycloak } from '@react-keycloak/web'

import { useUser } from 'hooks/useUser'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  border: 1px solid rgb(232, 232, 232);
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`
const StyledTitle = styled(Title)`
  text-align: center;
`
export default function AdemeLoginButton() {
  const { keycloak, initialized } = useKeycloak()

  const { data: user } = useUser(keycloak.authenticated)

  return initialized ? (
    keycloak.authenticated ? (
      <Wrapper>
        <StyledTitle as='h4' look='h4' align='center'>
          Bonjour {user?.firstName} {user?.lastName}
        </StyledTitle>
        <ButtonGroup isInlineFrom='md' align='center'>
          <Button secondary onClick={keycloak.logout}>
            Me deconnecter
          </Button>

          <MagicLink to='/bilans'>
            <Button>Voir mes bilans</Button>
          </MagicLink>
        </ButtonGroup>
      </Wrapper>
    ) : (
      <ButtonGroup isInlineFrom='md' align='center'>
        <Button onClick={keycloak.login} size='lg'>
          M'inscrire ou me connecter
        </Button>
      </ButtonGroup>
    )
  ) : null
}
