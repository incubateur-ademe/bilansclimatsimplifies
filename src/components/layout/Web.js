import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button, Container } from '@dataesr/react-dsfr'

import AuthContext from 'utils/AuthContext'
import Header from './Header'
import Footer from './Footer'

const StyledContainer = styled(Container)`
  max-width: 52rem;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
`
export default function Web(props) {
  const { token, setToken } = useContext(AuthContext)

  return (
    <>
      <Header />

      <StyledContainer role='main'>
        {props.children}
        <br />
        <br />
        <br />
        {token && <Button onClick={() => setToken(null)}>Logout</Button>}
      </StyledContainer>
      <Footer />
    </>
  )
}
