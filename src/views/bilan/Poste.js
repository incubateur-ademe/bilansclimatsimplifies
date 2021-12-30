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
    props.bilan[`poste${props.index}`] / 1000
  )

  return (
    <Col>
      <Wrapper>
        <StyledTitle as='h4' look='h4'>
          {props.index === 1
            ? 'Émissions directes GES sources fixes'
            : 'Émissions directes GES sources mobiles'}
        </StyledTitle>
        {!edit && (
          <StyledTitle as='h2'>
            {props.bilan[`poste${props.index}`] > 1000
              ? Math.round(props.bilan[`poste${props.index}`] / 1000)
              : props.bilan[`poste${props.index}`] / 1000 || 0}{' '}
            tCO2e
          </StyledTitle>
        )}
        {edit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate({
                [`manuelPoste${props.index}`]:
                  Number(String(localValue).replace(',', '.')) * 1000,
              })
              setEdit(false)
            }}
          >
            <TextInput
              label={`Total en tCO2e`}
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
              <Button
                onClick={() => {
                  setLocalValue(props.bilan[`poste${props.index}`] / 1000)
                  setEdit(true)
                }}
                secondary
              >
                Éditer le poste {props.index}
              </Button>
            )}
          </ButtonGroup>
        )}
      </Wrapper>
    </Col>
  )
}
