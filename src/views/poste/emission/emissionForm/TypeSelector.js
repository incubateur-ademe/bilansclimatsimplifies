import React from 'react'
import { Select } from '@dataesr/react-dsfr'

import { useFacteursEmission } from 'hooks/useFacteursEmission'

export default function TypeSelector(props) {
  const { data: facteurEmission } = useFacteursEmission()
  return facteurEmission ? (
    <Select
      label={props.poste === 1 ? `Type de combustible` : 'Type de carburant'}
      selected={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      options={
        props.poste === 1
          ? [
              { value: '', label: '', disabled: true, hidden: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe === 'Les plus utilisés')
                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
              { value: '', label: '-----', disabled: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe !== 'Les plus utilisés')

                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
            ]
          : [
              { value: '', label: '', disabled: true, hidden: true },
              { value: 'routier', label: 'Routier', disabled: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe === 'Routier')
                .filter(
                  (entry) => entry[1].classification === props.classification
                )
                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
              { value: 'non routier', label: 'Non routier', disabled: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe !== 'Routier')
                .filter(
                  (entry) => entry[1].classification === props.classification
                )
                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
            ]
      }
      required
    />
  ) : null
}
