import React, { useState } from 'react'
import styled from 'styled-components'
import { Col, ButtonGroup, Button, TextInput } from '@dataesr/react-dsfr'

import { useBilansMutation } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  border: 1px solid;
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`
export default function Poste(props) {
  const [edit, setEdit] = useState(false)

  const mutation = useBilansMutation(props.bilan.id)

  const [localValue, setLocalValue] = useState(
    props.bilan[`poste${props.index}`]
  )

  return (
    <Col>
      <Wrapper>
        <h4>
          Poste {props.index}{' '}
          {!edit && <>: {props.bilan[`poste${props.index}`] || 0} kgCO2e</>}
        </h4>
        {edit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate({
                [`manuelPoste${props.index}`]: localValue,
              })
              setEdit(false)
            }}
          >
            <TextInput
              label={`Total en kgCO2e`}
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
            />
            <ButtonGroup align='right' isInlineFrom='md'>
              <Button onClick={() => setEdit(false)} secondary>
                Annuler
              </Button>
              <Button submit>Valider</Button>
            </ButtonGroup>
          </form>
        ) : (
          <ButtonGroup align='right' isInlineFrom='md'>
            {props.bilan.mode === 'auto' ? (
              <MagicLink to={`/bilans/${props.bilan.id}/poste${props.index}`}>
                <Button>Éditer le poste {props.index}</Button>
              </MagicLink>
            ) : (
              <Button onClick={() => setEdit(true)}>
                Éditer le poste {props.index}
              </Button>
            )}
          </ButtonGroup>
        )}
      </Wrapper>
    </Col>
  )
}
