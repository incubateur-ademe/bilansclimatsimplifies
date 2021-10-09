import React, { useState } from 'react'
import styled from 'styled-components'
import { Highlight, Text, TextInput, Button } from '@dataesr/react-dsfr'

const StyledText = styled(Text)`
  margin-bottom: 1rem !important;
`
export default function ContactForm() {
  const [email, setEmail] = useState('')

  return (
    <Highlight>
      <StyledText>
        Entrez votre email ci-dessous pour être recontacté à la sortie de cet
        outil
      </StyledText>
      <form onSubmit={() => console.log(email)}>
        <TextInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          label='Votre email'
          type='email'
          required
        />
        <Button type='submit'>Me tenir informé</Button>
      </form>
    </Highlight>
  )
}
