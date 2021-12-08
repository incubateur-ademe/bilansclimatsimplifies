import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { TextInput, Button, Highlight, ButtonGroup } from '@dataesr/react-dsfr'

import AuthContext from 'utils/AuthContext'
import { useLoginUser } from 'hooks/useUser'
import MagicLink from 'components/base/MagicLink'

const StyledHighlight = styled(Highlight)`
  max-width: 36.5rem;
  margin: 0 0 2rem;
  padding: 1rem 0 0 2rem;

  p {
    margin-bottom: 1rem;
  }
`
const StyledButton = styled(Button)`
  margin-bottom: 1rem;
`
export default function LoginForm() {
  const { token, setToken } = useContext(AuthContext)

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useLoginUser()

  return token ? (
    <ButtonGroup isInlineFrom='md' align='center'>
      <Button secondary onClick={() => setToken(null)}>
        Me deconnecter
      </Button>
      <MagicLink to='/bilans'>
        <Button>Voir mes bilans</Button>
      </MagicLink>
    </ButtonGroup>
  ) : (
    <StyledHighlight>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutation.mutate(
            { username, password },
            {
              onSuccess: () => {
                history.push('/bilans')
              },
            }
          )
        }}
      >
        <TextInput
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          label={`Nom d'utilisateur`}
          name='username'
          type='text'
          required
        />
        <TextInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          label={`Mot de passe`}
          name='password'
          type='password'
          required
        />
        <StyledButton submit disabled={mutation.isLoading}>
          Me connecter
        </StyledButton>
      </form>
    </StyledHighlight>
  )
}
