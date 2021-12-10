import React, { useEffect } from 'react'
import { Select } from '@dataesr/react-dsfr'

import { useFacteursEmission } from 'hooks/useFacteursEmission'

export default function TypeSelector(props) {
  const { data: facteurEmission } = useFacteursEmission()

  const type = props.type
  const localisation = props.localisation
  const onChange = props.onChange
  useEffect(() => {
    facteurEmission &&
      type &&
      localisation &&
      onChange(
        Object.entries(
          facteurEmission[type].facteurs[localisation]
        )[0][0].split('/')[1]
      )
  }, [type, localisation, onChange, facteurEmission])

  return facteurEmission ? (
    <Select
      disabled={!props.type}
      label={`Unité`}
      selected={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      options={[
        { value: '', label: '', disabled: true, hidden: true },
        ...(props.type && props.localisation
          ? Object.entries(
              facteurEmission[props.type].facteurs[props.localisation]
            ).map((fe) => ({
              value: fe[0].split('/')[1],
              label: fe[0].split('/')[1],
            }))
          : []),
      ]}
      required
    />
  ) : null
}
