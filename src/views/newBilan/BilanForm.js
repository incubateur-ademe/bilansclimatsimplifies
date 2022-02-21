import React from 'react'

import listNaf from 'utils/listNaf'
import listRegions from 'utils/listRegions'
import { TextInput, Select, Alert } from '@dataesr/react-dsfr'

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
        onBlur={props.checkNombreSalaries}
        messageType={props.errors.includes('nombreSalaries') ? 'error' : null}
        required
      />
      {props.errors.includes('nombreSalaries') && (
        <Alert
          type='error'
          description={`Le nombre de salarié doit être compris entre 50 et 500`}
        />
      )}
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

      <Select
        label={`Année de reporting du bilan`}
        hint='Année n, n-1 ou n-2 par rapport à l’année en cours'
        options={[
          {
            value: '',
            label: '',
            disabled: true,
            hidden: true,
          },
          { value: 2022, label: '2022' },
          { value: 2021, label: '2021' },
          { value: 2020, label: '2020' },
        ]}
        selected={props.annee}
        onChange={(e) => props.setAnnee(e.target.value)}
        messageType={props.errors.includes('annee') ? 'error' : null}
        required
      />
    </>
  )
}
