import React, { useState } from 'react'
import {
  Row,
  Col,
  TextInput,
  Checkbox,
  Button,
  ButtonGroup,
  Alert,
  Text,
  Callout,
  CalloutText,
  CalloutTitle,
} from '@dataesr/react-dsfr'

import { useSignup } from 'hooks/useUser'
import MagicLink from 'components/base/MagicLink'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [cgu, setCgu] = useState(false)

  const mutation = useSignup()
  console.log(mutation)
  return mutation.isSuccess ? (
    <Callout hasInfoIcon={false}>
      <CalloutTitle as='h1'>Votre compte a bien été créé</CalloutTitle>
      <CalloutText>
        Vous allez recevoir un email sous peu afin de l'activer.
      </CalloutText>
      <MagicLink to='/'>
        <Button title='retour'>Retourner à l'accueil</Button>
      </MagicLink>
    </Callout>
  ) : (
    <>
      <Row gutters>
        <Col>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              mutation.mutate({
                email,
                firstname,
                lastname,
                cgu,
              })
            }}
          >
            <TextInput
              label={`Email`}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextInput
              label={`Prénom`}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <TextInput
              label={`Nom`}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Checkbox
              checked={cgu}
              value={'cgu'}
              label={`J'accepte la politique de protection des données personnelles de l'ADEME`}
              onChange={(e) => setCgu((prevCgu) => !prevCgu)}
              required
            />
            <Text size='xs'>
              <MagicLink to='https://agirpourlatransition.ademe.fr/politique-protection-donnees-a-caractere-personnel'>
                Voir la politique de protection des données personnelles de
                l'ADEME
              </MagicLink>
            </Text>
            <ButtonGroup align='right' isInlineFrom='md'>
              <MagicLink to={`/`}>
                <Button secondary>Annuler</Button>
              </MagicLink>
              <Button submit>Valider</Button>
            </ButtonGroup>
            {mutation.isError && (
              <Alert
                type='error'
                title='Une erreur est survenue'
                description={mutation?.error?.response?.data?.message}
              />
            )}
          </form>
        </Col>
      </Row>
    </>
  )
}
