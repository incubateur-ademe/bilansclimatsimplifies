import React from 'react'
import {
  Row,
  Col,
  Text,
  Title,
  Callout,
  CalloutTitle,
  CalloutText,
} from '@dataesr/react-dsfr'

import MagicLink from 'components/base/MagicLink'
import AdemeLoginButtons from './home/AdemeLoginButtons'

export default function Home() {
  return (
    <>
      <Row gutters alignItems='middle'>
        <Col>
          <Title as='h1'>Bilans Climat Simplifiés</Title>
          <Text size='lead'>
            Vous êtes une entreprise employant entre 50 et 500 salariés et avez
            reçu une aide de l’Etat dans le cadre du Plan de Relance ? Calculez
            et publiez votre Bilan Climat Simplifié sur ce site.
          </Text>
          <Text>
            Le Bilan Climat Simplifié prévu au{' '}
            <a
              href='https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000042753853'
              target='_blank'
              rel='noreferrer'
            >
              1° du I de l'article 244 de la loi n° 2020-1721
            </a>{' '}
            porte sur les émissions de Gaz à Effet de Serre (GES) directes
            produites par les sources d'énergie fixes et mobiles nécessaires aux
            activités de votre entreprise :
          </Text>
          <ul>
            <li>
              Le poste 1 du Bilan Climat Simplifié correspond aux émissions
              directes de GES des sources fixes contrôlées par votre entreprise
              ;
            </li>
            <li>
              Le poste 2 du Bilan Climat Simplifié correspond aux émissions
              directes de GES des sources mobiles contrôlées par votre
              entreprise.
            </li>
          </ul>
          <Text>
            Le calculateur de ce site vous proposera selon une approche de
            contrôle opérationnel d’identifier et de quantifier ces émissions de
            façon cohérente avec la méthodologie réglementaire relative à
            l’article R. 229-49 du code de l’environnement.
          </Text>
          <Text>
            Pour plus d’informations, vous pouvez consulter la{' '}
            <a
              href='https://www.economie.gouv.fr/files/files/directions_services/plan-de-relance/FAQ_Entreprises_France_Relance.pdf?v=1643372205'
              target='_blank'
              rel='noreferrer'
            >
              FAQ dédiée
            </a>{' '}
            ainsi que la{' '}
            <a
              href='https://www.economie.gouv.fr/files/files/directions_services/plan-de-relance/Tableau_mesures_Article_244_LFI_2021_v1412.pdf?v=1643372205'
              target='_blank'
              rel='noreferrer'
            >
              liste des mesures concernées du plan France Relance
            </a>{' '}
            disponibles sur le{' '}
            <a
              href='https://www.economie.gouv.fr/plan-de-relance/documents-utiles'
              target='_blank'
              rel='noreferrer'
            >
              site du Ministère de l’économie des finances et de la relance
            </a>{' '}
            .
          </Text>
        </Col>
      </Row>
      <Row gutters alignItems='middle'>
        <Col>
          <AdemeLoginButtons />
        </Col>
      </Row>
      <Row>
        <Col>
          <Callout hasInfoIcon={false}>
            <CalloutTitle>Consulter les bilans</CalloutTitle>
            <CalloutText>
              Vous pouvez télécharger un export de l'ensemble des bilans ici :{' '}
              <MagicLink to='https://data.ademe.fr/datasets/bilans-climat-simplifies'>
                https://data.ademe.fr/datasets/bilans-climat-simplifies
              </MagicLink>
            </CalloutText>
          </Callout>
        </Col>
      </Row>
    </>
  )
}
