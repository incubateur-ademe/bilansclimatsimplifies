import React from 'react'
import { Select } from '@dataesr/react-dsfr'

import { useFacteursEmission } from 'hooks/useFacteursEmission'

export default function TypeSelector(props) {
  const { data: facteurEmission } = useFacteursEmission()

  return facteurEmission ? (
    <Select
      label={`Type d'émission`}
      selected={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      options={[
        { value: '', label: '', disabled: true, hidden: true },
        ...Object.entries(facteurEmission)
          .filter((entry) => Number(entry[1].poste) === props.poste)
          .map((entry) => ({ value: entry[0], label: entry[0] })),
      ]}
    />
  ) : null
}
