import React from 'react'
import { Row, Col, Text, Title } from '@dataesr/react-dsfr'

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
        </Col>
      </Row>
      <Row gutters alignItems='middle'>
        <Col>
          <AdemeLoginButtons />
        </Col>
      </Row>
    </>
  )
}
