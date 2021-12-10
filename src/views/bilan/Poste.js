import React, { useState } from 'react'
import styled from 'styled-components'
import { Col, Title, ButtonGroup, Button, TextInput } from '@dataesr/react-dsfr'

import { useBilansMutation } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  border: 1px solid rgb(232, 232, 232);
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`
const StyledTitle = styled(Title)`
  text-align: center;
`
export default function Poste(props) {
  const [edit, setEdit] = useState(props.edit)

  const mutation = useBilansMutation(props.bilan.id)

  const [localValue, setLocalValue] = useState(
    props.bilan[`poste${props.index}`]
  )

  return (
    <Col>
      <Wrapper>
        <StyledTitle as='h4' look='h4'>
          Poste {props.index}
        </StyledTitle>
        {!edit && (
          <StyledTitle as='h2'>
            {props.bilan[`poste${props.index}`] || 0} kgCO2e
          </StyledTitle>
        )}
        {edit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate({
                [`manuelPoste${props.index}`]: String(localValue)
                  .split(',')[0]
                  .split('.')[0],
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
          <ButtonGroup align='center' isInlineFrom='md'>
            {props.bilan.mode === 'auto' ? (
              <MagicLink to={`/bilans/${props.bilan.id}/poste${props.index}`}>
                <Button secondary>Éditer le poste {props.index}</Button>
              </MagicLink>
            ) : (
              <Button onClick={() => setEdit(true)} secondary>
                Éditer le poste {props.index}
              </Button>
            )}
          </ButtonGroup>
        )}
      </Wrapper>
    </Col>
  )
}
