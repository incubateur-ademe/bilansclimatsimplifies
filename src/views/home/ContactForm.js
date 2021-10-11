import React, { useState } from 'react'
import styled from 'styled-components'

import { TextInput, Button, Callout, Text, Alert } from '@dataesr/react-dsfr'

import useSubscribeEmail from 'hooks/useSubscribeEmail'

const StyledCallout = styled(Callout)`
  margin-bottom: 2rem;
`
export default function ContactForm() {
  const [email, setEmail] = useState('')

  const mutation = useSubscribeEmail()
  return (
    <StyledCallout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutation.mutate(email)
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
        <Button submit disabled={mutation.isLoading}>
          Me tenir informé
        </Button>
        {mutation.isError && (
          <Alert
            title={
              mutation?.error?.response?.data?.message ===
              'Contact already in list and/or does not exist'
                ? `Vous êtes déjà inscrit`
                : `Une erreur est survenue`
            }
            type='error'
            small
          />
        )}
        {mutation.isSuccess && (
          <Alert title='Vous êtes inscrit' type='success' small />
        )}
      </form>
    </StyledCallout>
  )
}
