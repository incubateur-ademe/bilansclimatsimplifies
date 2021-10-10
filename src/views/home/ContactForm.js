import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, TextInput, Button } from '@dataesr/react-dsfr'

const Form = styled.form`
  margin-bottom: 3rem;
`
export default function ContactForm() {
  const [email, setEmail] = useState('')

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(email)
      }}
    >
      <Text>
        Entrez votre email ci-dessous pour être recontacté à la sortie de cet
        outil
      </Text>
      <TextInput
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        label='Votre email'
        name='email'
        type='email'
        required
      />
      <Button submit>Me tenir informé</Button>
    </Form>
  )
}
