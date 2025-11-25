import React from 'react'
import styled from 'styled-components'
import { Callout, CalloutText, CalloutTitle, Container } from '@dataesr/react-dsfr'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header'
import Footer from './Footer'
import FetchIndicator from './web/FetchIndicator'

const StyledContainer = styled(Container)`
  max-width: 52rem;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
`

const StyledCalloutContainer = styled(Container)`
  max-width: 52rem;
`
export default function Web(props) {
  return (
    <>
      <FetchIndicator />
      <Header />

      <StyledCalloutContainer>
        <Callout as="h3" hasInfoIcon={false} colorFamily="yellow-moutarde" className="fr-icon-alert-line fr-mt-2w" role="alert">
          <CalloutTitle>Fermeture du site</CalloutTitle>
          <CalloutText>
            Le dispositif du bilan climat simplifié prévu par la loi de finances pour 2021 (article 244){" "}
            touche à sa fin et ce site sera prochainement fermé. Le dépôt des mises à jour du bilan climat{" "}
            sur cette plateforme ne sera plus exigé.
          </CalloutText>
        </Callout>
      </StyledCalloutContainer>

      <StyledContainer role='main'>{props.children}</StyledContainer>
      <Footer />
      <ToastContainer
        position='bottom-left'
        transition={Slide}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        limit={2}
      />
    </>
  )
}
