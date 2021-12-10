import React, { useEffect } from 'react'
import { Select } from '@dataesr/react-dsfr'

import { useFacteursEmission } from 'hooks/useFacteursEmission'

export default function LocationSelector(props) {
  const { data: facteurEmission } = useFacteursEmission()

  const type = props.type
  const onChange = props.onChange
  useEffect(() => {
    facteurEmission &&
      type &&
      onChange(Object.entries(facteurEmission[type].facteurs)[0][0])
  }, [type, onChange, facteurEmission])

  return facteurEmission ? (
    <Select
      disabled={!props.type}
      label={`Localisation`}
      selected={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      options={[
        { value: '', label: '', disabled: true, hidden: true },
        ...(props.type
          ? Object.entries(facteurEmission[props.type].facteurs).map((fe) => ({
              value: fe[0],
              label: fe[0],
            }))
          : []),
      ]}
      required
    />
  ) : null
}
