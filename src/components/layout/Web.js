import React from 'react'
import styled from 'styled-components'
import { Button, Container } from '@dataesr/react-dsfr'

import { useLocalToken } from 'hooks/useUser'
import Header from './Header'
import Footer from './Footer'

const StyledContainer = styled(Container)`
  max-width: 52rem;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
`
export default function Web(props) {
  const { token, setToken } = useLocalToken()
  console.log(token)
  return (
    <>
      <Header />
      {token && <Button onClick={() => setToken(null)}>Logout</Button>}
      <StyledContainer role='main'>{props.children}</StyledContainer>
      <Footer />
    </>
  )
}
