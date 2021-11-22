import React, { useEffect } from 'react'
import { Select } from '@dataesr/react-dsfr'

import { useFacteursEmission } from 'hooks/useFacteursEmission'

export default function TypeSelector(props) {
  const { data: facteurEmission } = useFacteursEmission()

  const type = props.type
  const onChange = props.onChange
  useEffect(() => {
    facteurEmission &&
      type &&
      onChange(
        Object.entries(
          facteurEmission[type].facteurs['France continentale']
        )[0][0].split('/')[1]
      )
  }, [type, onChange, facteurEmission])

  return facteurEmission ? (
    <Select
      label={`Unité`}
      selected={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      options={[
        { value: '', label: '', disabled: true, hidden: true },
        ...(props.type
          ? Object.entries(
              facteurEmission[props.type].facteurs['France continentale']
            ).map((fe) => ({
              value: fe[0].split('/')[1],
              label: fe[0].split('/')[1],
            }))
          : []),
      ]}
    />
  ) : null
}
