import React from 'react'

import listNaf from 'utils/listNaf'
import listRegions from 'utils/listRegions'
import { TextInput, Select } from '@dataesr/react-dsfr'

export default function BilanForm(props) {
  return (
    <>
      <TextInput
        label={`Raison sociale`}
        value={props.raisonSociale}
        onChange={(e) => props.setRaisonSociale(e.target.value)}
        required
      />
      <TextInput
        type='number'
        label={`Nombre de salariés`}
        hint='Ce bilan est réservé aux entreprises de 50 à 500 salariés'
        value={props.nombreSalaries}
        onChange={(e) => props.setNombreSalaries(e.target.value)}
        messageType={props.errors.includes('nombreSalaries') ? 'error' : null}
        required
      />
      <TextInput
        label={`SIREN`}
        value={props.siren}
        onChange={(e) => props.setSiren(e.target.value)}
        messageType={props.errors.includes('siren') ? 'error' : null}
        required
      />
      <Select
        label={`Secteur d'activité (NAF rév. 2)`}
        options={[
          {
            value: '',
            label: '',
            disabled: true,
            hidden: true,
          },
          ...listNaf,
        ]}
        selected={props.naf}
        onChange={(e) => props.setNaf(e.target.value)}
        required
      />
      <Select
        label={`Région du siège de l’entreprise`}
        options={[
          {
            value: '',
            label: '',
            disabled: true,
            hidden: true,
          },
          ...listRegions,
        ]}
        selected={props.region}
        onChange={(e) => props.setRegion(e.target.value)}
        required
      />

      <TextInput
        label={`Année de reporting du bilan`}
        hint='Année n, n-1 ou n-2 par rapport à l’année en cours'
        value={props.annee}
        onChange={(e) => props.setAnnee(e.target.value)}
        messageType={props.errors.includes('annee') ? 'error' : null}
        required
      />
    </>
  )
}
