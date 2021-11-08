import React, { useState } from 'react'
import { Button, TextInput } from '@dataesr/react-dsfr'

import { useEmissionsCreation } from 'hooks/useEmissions'

export default function NewEmission(props) {
  const [open, setOpen] = useState(false)

  const [type, setType] = useState('')
  const [valeur, setValeur] = useState('')
  const [unite, setUnite] = useState('')
  const [note, setNote] = useState('')

  const mutation = useEmissionsCreation()

  return open ? (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(
          {
            bilan: props.bilan,
            poste: props.poste,
            type,
            valeur,
            unite,
            note,
          },
          { onSuccess: () => setOpen(false) }
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

      <Button submit>Ajouter une source d'émission</Button>
      <br />
      <br />
      <Button onClick={() => setOpen(false)}>Annuler</Button>
    </form>
  ) : (
    <Button onClick={() => setOpen(true)}>Ajouter une source d'émission</Button>
  )
}
