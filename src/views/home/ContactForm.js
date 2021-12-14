import React, { useState } from 'react'
import styled from 'styled-components'
import {
  TextInput,
  Button,
  ButtonGroup,
  Text,
  Alert,
  Title,
} from '@dataesr/react-dsfr'

import useContact from 'hooks/useContact'

const Wrapper = styled.form`
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
  border: 1px solid rgb(232, 232, 232);
`
export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const mutation = useContact()

  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(email)
      }}
    >
      <Title as='h4'>Contact</Title>
      <Text>Vous avez une question ? Contactez nous via ce formulaire</Text>
      <input type='hidden' name='form-name' value='contact' />
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
      <TextInput
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        label='Votre nom'
        name='nom'
        type='text'
        required
      />
      <TextInput
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
        label='Votre message'
        name='message'
        textarea
        required
      />

      <ButtonGroup isInlineFrom='md' align='right'>
        <Button submit disabled={mutation.isLoading}>
          Envoyer
        </Button>
      </ButtonGroup>
      {mutation.isError && (
        <Alert title={`Une erreur est survenue`} type='error' small />
      )}
      {mutation.isSuccess && (
        <Alert title='Votre message est envoyé' type='success' small />
      )}
    </Wrapper>
  )
}
