import React from 'react'
import {
  Header as Wrapper,
  HeaderOperator,
  HeaderBody,
  Logo,
  Service,
  Tool,
  ToolItemGroup,
  Button,
} from '@dataesr/react-dsfr'

import Ademe from 'components/base/Ademe'

import { useKeycloak } from '@react-keycloak/web'

export default function Header() {
  const { keycloak } = useKeycloak()

  return (
    <Wrapper>
      <HeaderBody>
        <Logo splitCharacter={10}>République Française</Logo>
        <HeaderOperator>
          <Ademe />
        </HeaderOperator>
        <Service
          title='Staging Bilans Climat Simplifiés'
          description='Plateforme de calcul et transmission des bilans simplifiés prévus par l’article 244 de la loi n° 2020-1721 du 29 décembre 2020'
        />
        <Tool>
          <ToolItemGroup>
            {keycloak.authenticated && <Button secondary onClick={() => keycloak.logout()}>Logout</Button>}
          </ToolItemGroup>
        </Tool>
      </HeaderBody>
    </Wrapper>
  )
}
