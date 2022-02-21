import React from 'react'
import {
  Footer,
  FooterLink,
  FooterBody,
  FooterBodyItem,
  Logo,
  FooterBottom,
  Link,
} from '@dataesr/react-dsfr'

export default function Header() {
  return (
    <Footer>
      <FooterBody description='Plateforme de calcul et transmission des bilans simplifiés prévus par l’article 244 de la loi n° 2020-1721 du 29 décembre 2020'>
        <Logo splitCharacter={10}>République Française</Logo>
        <FooterBodyItem>
          <Link href='https://www.ademe.fr/'>ademe.fr</Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href='https://beta.gouv.fr/'>beta.gouv.fr</Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href='https://data.ademe.fr/'>data.ademe.fr</Link>
        </FooterBodyItem>
      </FooterBody>
      <FooterBottom>
        <FooterLink href='/mentionslegales'>
          accessibilité : non conforme
        </FooterLink>
        <FooterLink href='/mentionslegales'>mentions légales</FooterLink>
        <FooterLink href='/mentionslegales'>données personnelles</FooterLink>
        <FooterLink href='/mentionslegales'>gestion des cookies</FooterLink>
        <FooterLink href='/contact'>contact</FooterLink>
      </FooterBottom>
    </Footer>
  )
}
