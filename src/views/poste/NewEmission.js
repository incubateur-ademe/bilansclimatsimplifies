import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { Button, ButtonGroup, TextInput, Alert } from '@dataesr/react-dsfr'

import { useEmissionsCreation } from 'hooks/useEmissions'
import TypeSelector from './emission/TypeSelector'
import UnitSelector from './emission/UnitSelector'

const Wrapper = styled.form`
  border: 1px solid rgb(232, 232, 232);
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`
const Values = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    flex: 1;
  }
`

export default function NewEmission(props) {
  const [open, setOpen] = useState(false)

  const [type, setType] = useState('')
  const [valeur, setValeur] = useState('')
  const [unite, setUnite] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    setType('')
    setValeur('')
    setUnite('')
    setNote('')
  }, [open])

  const poste = props.poste
  useEffect(() => {
    setOpen(false)
  }, [poste])

  const mutation = useEmissionsCreation()

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.dismiss()
      toast.success('Bilan sauvegardé.')
    }
  }, [mutation.isSuccess])
  useEffect(() => {
    if (mutation.isError) {
      toast.dismiss()
      toast.error(`Vos modifications n'ont pas été sauvegardées.`)
    }
  }, [mutation.isError])

  return open ? (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(
          {
            bilan: props.bilan,
            poste: props.poste,
            type,
            valeur: String(valeur).replace(',', '.'),
            unite,
            note,
          },
          { onSuccess: () => setOpen(false) }
        )
      }}
    >
      <TypeSelector value={type} onChange={setType} poste={props.poste} />
      <Values>
        <TextInput
          label={`Valeur`}
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
          required
        />
        <UnitSelector value={unite} onChange={setUnite} type={type} />
      </Values>
      <TextInput
        label={`Note`}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <ButtonGroup isInlineFrom='md' align='right'>
        <Button secondary onClick={() => setOpen(false)}>
          Annuler
        </Button>
        <Button submit>Ajouter une source d'émission</Button>
      </ButtonGroup>
    </Wrapper>
  ) : (
    <>
      {props.empty && (
        <>
          <Alert
            title={`Vous n'avez pas encore ajouté de source d'émission pour ce poste`}
          />
          <br />
        </>
      )}

      <ButtonGroup isInlineFrom='md' align='right'>
        <Button onClick={() => setOpen(true)}>
          Ajouter une source d'émission
        </Button>
      </ButtonGroup>
    </>
  )
}
