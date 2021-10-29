import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  border: 1px solid;
  margin-bottom: 1rem;
  padding: 1rem;
`
export default function Bilan(props) {
  return (
    <Wrapper>
      <h2>
        {props.bilan.raisonSociale} - {props.bilan.annee}
      </h2>
      <MagicLink to={`/bilans/${props.bilan.id}/poste1`}>
        Faire mon bilan
      </MagicLink>
    </Wrapper>
  )
}
