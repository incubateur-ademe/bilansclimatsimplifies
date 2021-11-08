import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Alert, Button, TextInput } from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'

export default function EditBilan() {
  const history = useHistory()

  const { id } = useParams()

  const { data: bilan } = useBilan(id)
  const mutation = useBilansMutation(id)

  const [raisonSociale, setRaisonSociale] = useState('')
  const [nombreSalaries, setNombreSalaries] = useState('')
  const [siren, setSiren] = useState('')
  const [naf, setNaf] = useState('')
  const [region, setRegion] = useState('')
  const [annee, setAnnee] = useState('')

  useEffect(() => {
    if (bilan) {
      setRaisonSociale(bilan.raisonSociale)
      setNombreSalaries(bilan.nombreSalaries)
      setSiren(bilan.siren)
      setNaf(bilan.naf)
      setRegion(bilan.region)
      setAnnee(bilan.annee)
    }
  }, [bilan])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(
          {
            raisonSociale,
            nombreSalaries,
            siren,
            naf,
            region,
            annee,
          },
          {
            onSuccess: () => {
              history.push('/bilans')
            },
          }
        )
      }}
    >
      <TextInput
        label={`Raison sociale`}
        value={raisonSociale}
        onChange={(e) => setRaisonSociale(e.target.value)}
        required
      />
      <TextInput
        label={`Nombre de salariés`}
        value={nombreSalaries}
        onChange={(e) => setNombreSalaries(e.target.value)}
        required
      />
      <TextInput
        label={`SIREN`}
        value={siren}
        onChange={(e) => setSiren(e.target.value)}
        required
      />
      <TextInput
        label={`Section de nomenclature`}
        value={naf}
        onChange={(e) => setNaf(e.target.value)}
        required
      />
      <TextInput
        label={`Région du siege`}
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        required
      />
      <TextInput
        label={`Année correspondant au bilan`}
        value={annee}
        onChange={(e) => setAnnee(e.target.value)}
        required
      />
      <MagicLink to='/bilans'>Annuler</MagicLink>
      <Button submit>Éditer ce bilan</Button>
      {mutation.isError && (
        <Alert type='error' title='Une erreur est survenue' />
      )}
    </form>
  )
}
