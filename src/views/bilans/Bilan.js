import React from 'react'
import styled from 'styled-components'
import { Row, Col, Title, ButtonGroup, Button } from '@dataesr/react-dsfr'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
  border: 1px solid rgb(232, 232, 232);
  box-shadow: none;

  &:hover {
    background-color: rgb(232, 232, 232);
  }
`

export default function Bilan(props) {
  return (
    <Row gutters>
      <Col>
        <Wrapper to={`/bilans/${props.bilan.id}`}>
          <Title as='h3' look='h4'>
            {props.bilan.raisonSociale} - {props.bilan.annee}
          </Title>
          <ButtonGroup isInlineFrom='md' align='left'>
            <Button secondary>Voir le bilan</Button>
          </ButtonGroup>
        </Wrapper>
      </Col>
    </Row>
  )
}
