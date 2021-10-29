import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, TextInput } from '@dataesr/react-dsfr'

import { useEmissionsMutation } from 'hooks/useEmissions'

const Wrapper = styled.div`
  border: 1px solid;
  margin-bottom: 1rem;
  padding: 1rem;
`
export default function Emission(props) {
  const [edit, setEdit] = useState(false)

  const [type, setType] = useState('')
  const [valeur, setValeur] = useState('')
  const [unite, setUnite] = useState('')
  const [note, setNote] = useState('')
  useEffect(() => {
    setType(props.emission.type)
    setValeur(props.emission.valeur)
    setUnite(props.emission.unite)
    setNote(props.emission.note)
  }, [props.emission])

  const mutation = useEmissionsMutation(props.emission.id)

  return (
    <Wrapper>
      {edit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate(
              {
                type,
                valeur,
                unite,
                note,
              },
              { onSuccess: () => setEdit(false) }
            )
          }}
        >
          <TextInput
            label={`Type`}
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <TextInput
            label={`Valeur`}
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
          <TextInput
            label={`Unité`}
            value={unite}
            onChange={(e) => setUnite(e.target.value)}
            required
          />
          <TextInput
            label={`Note`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button submit>Valider</Button>
        </form>
      ) : (
        <>
          <h2>
            {props.emission.type} - {props.emission.note}
          </h2>
          <div>
            {props.emission.valeur} {props.emission.unite}
          </div>
          <Button onClick={() => setEdit(true)}>Éditer</Button>
        </>
      )}
    </Wrapper>
  )
}
