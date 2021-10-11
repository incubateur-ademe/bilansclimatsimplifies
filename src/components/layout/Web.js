import React from 'react'
import styled from 'styled-components'
import { Container } from '@dataesr/react-dsfr'
import Header from './Header'
import Footer from './Footer'

const StyledContainer = styled(Container)`
  max-width: 64rem;
  min-height: 100vh;
  padding: 3rem 0;
`
export default function Web(props) {
  return (
    <>
      <Header />
      <StyledContainer role='main'>{props.children}</StyledContainer>
      <Footer />
    </>
  )
}
