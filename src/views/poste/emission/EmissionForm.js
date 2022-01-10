import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, RadioGroup, Radio } from '@dataesr/react-dsfr'

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
  const [classification, setclassification] = useState(null)

  return classification || props.poste === 1 ? (
    <>
      <Row>
        <StyledCol n='6'>
          <TypeSelector
            value={props.type}
            onChange={(type) => {
              props.setType(type)
              props.setLocalisation(null)
            }}
            classification={classification}
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
  ) : (
    <Row gutters>
      <Col>
        <RadioGroup onChange={setclassification} legend=''>
          <Radio
            label='Je connais les consommations de carburant de mes véhicules'
            value='carburant'
            isExtended
          />
          <Radio
            label='Je connais les distances parcourues et tonnages transportés de mes véhicules'
            value='véhicule'
            isExtended
          />
        </RadioGroup>
      </Col>
    </Row>
  )
}
