import React from 'react'
import { TextInput } from '@dataesr/react-dsfr'

export default function ValueInput(props) {
  return (
    <TextInput
      type='text'
      inputmode='numeric'
      pattern='[0-9]*'
      label={`Valeur`}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      disabled={!props.type}
      required
    />
  )
}
