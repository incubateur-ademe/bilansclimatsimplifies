import React from 'react'
import styled from 'styled-components'

import { useBilansDeletion } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
import { Button } from '@dataesr/react-dsfr'

const Wrapper = styled.div`
  border: 1px solid;
  margin-bottom: 1rem;
  padding: 1rem;
`
export default function Bilan(props) {
  const deletion = useBilansDeletion(props.bilan.id)

  return (
    <Wrapper>
      <h2>
        {props.bilan.raisonSociale} - {props.bilan.annee}
      </h2>
      <MagicLink to={`/bilans/${props.bilan.id}/poste1`}>
        Faire mon bilan
      </MagicLink>
      <br />
      <MagicLink to={`/bilans/${props.bilan.id}/editer`}>
        Éditer les infos
      </MagicLink>
      <br />
      <Button onClick={() => deletion.mutate()}>Supprimer ce bilan</Button>
    </Wrapper>
  )
}
