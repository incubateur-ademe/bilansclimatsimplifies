import React from 'react'
import { TextInput } from '@dataesr/react-dsfr'

export default function NoteInput(props) {
  return (
    <>
      <TextInput
        textarea
        label={`Note`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <br />
    </>
  )
}
