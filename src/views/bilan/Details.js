import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Text, ButtonGroup, Button } from '@dataesr/react-dsfr'

import listNaf from 'utils/listNaf'
import listRegions from 'utils/listRegions'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  border: 1px solid rgb(232, 232, 232);
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`

export default function Details(props) {
  const { id } = useParams()

  return (
    <Wrapper>
      <Text>
        Siren : {props.bilan?.siren}
        <br />
        Nombre de salariés : {props.bilan?.nombreSalaries}
        <br />
        Région :{' '}
        {
          listRegions.find((item) => item.value === props.bilan?.region)?.label
        }{' '}
        ({props.bilan?.region})
        <br />
        NAF : {listNaf.find((item) => item.value === props.bilan?.naf)?.label} (
        {props.bilan?.naf})
      </Text>
      {!props.print && (
        <ButtonGroup isInlineFrom='md' align='right'>
          <MagicLink to={`/bilans/${id}/infos`}>
            <Button secondary>Éditer les informations</Button>
          </MagicLink>
        </ButtonGroup>
      )}
    </Wrapper>
  )
}
