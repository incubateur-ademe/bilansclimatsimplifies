import React from 'react'
import styled from 'styled-components'
import { Row, Col } from '@dataesr/react-dsfr'

import TypeSelector from './emissionForm/TypeSelector'
import LocationSelector from './emissionForm/LocationSelector'
import UnitSelector from './emissionForm/UnitSelector'
import ValueInput from './emissionForm/ValueInput'
import NoteInput from './emissionForm/NoteInput'

const StyledCol = styled(Col)`
  @media only screen and (max-width: 48em) {
    flex: 1;
    width: 100%;
    max-width: 100%;
  }
`
export default function EmissionForm(props) {
  return (
    <>
      <Row gutters>
        <StyledCol n='6'>
          <TypeSelector
            value={props.type}
            onChange={(type) => {
              props.setType(type)
              props.setLocalisation(null)
            }}
            poste={props.poste}
          />
        </StyledCol>
      </Row>
      <Row gutters>
        <StyledCol n='6'>
          <LocationSelector
            value={props.localisation}
            onChange={props.setLocalisation}
            type={props.type}
          />
        </StyledCol>
      </Row>
      <Row gutters>
        <StyledCol>
          <ValueInput
            value={props.valeur}
            onChange={props.setValeur}
            type={props.type}
          />
        </StyledCol>
        <StyledCol>
          <UnitSelector
            value={props.unite}
            onChange={props.setUnite}
            type={props.type}
            localisation={props.localisation}
          />
        </StyledCol>
      </Row>
      <Row gutters>
        <Col>
          <NoteInput value={props.note} onChange={props.setNote} />
        </Col>
      </Row>
    </>
  )
}
