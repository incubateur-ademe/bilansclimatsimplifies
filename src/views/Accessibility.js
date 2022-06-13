import React from 'react'
import { Row, Col, Text, Title } from '@dataesr/react-dsfr'

export default function MentionsLegales() {
  return (
    <Row>
      <Col>
        <Title as='h1'>Déclaration d’accessibilité</Title>
        <Text>
          L’ADEME s’engage à rendre ses sites internet accessibles conformément
          à l’article 47 de la loi n° 2005-102 du 11 février 2005.
          <br />
          La présente déclaration d’accessibilité s’applique au site Bilans
          Climat Simplifiés.
        </Text>
        <Title as='h2' look='h2'>
          État de conformité
        </Title>
        <Text>
          Le site Bilans Climat Simplifiés
          (https://bilans-climat-simplifies.ademe.fr/) est partiellement
          conforme avec le référentiel général d’amélioration de
          l’accessibilité, RGAA version 4.1, en raison des non-conformités
          énumérées dans la section « Résultats des tests ».
        </Text>
        <Title as='h2' look='h2'>
          Résultats des tests
        </Title>
        <Text>
          L’audit de conformité réalisé le 01/03/2022 par la société Access42
          révèle que le site est conforme à 62,79 % au RGAA version 4.1.
        </Text>
        <Title as='h3' look='h3'>
          Contenus inaccessibles
        </Title>
        <Text>
          Les contenus listés ci-dessous ne sont pas accessibles pour les
          raisons suivantes.
        </Text>
        <Title as='h4' look='h4'>
          Non-conformités
        </Title>
        <ul>
          <li>Une image porteuse d’information n’a pas d’alternative ;</li>
          <li>Des textes ont des contrastes insuffisants ;</li>
          <li>Des liens n'ont pas d’intitulé explicite ;</li>
          <li>
            Des fonctionnalités JavaScript font un usage inapproprié de
            propriétés ARIA ;
          </li>
          <li>
            Des changements de contexte se déclenchent sans que l’utilisateur en
            soit informé ;
          </li>
          <li>
            Des messages de statut ne sont pas restitués par les technologies
            d’assistance ;
          </li>
          <li>Des pages contiennent des erreurs de code source ; </li>
          <li>Des pages n’ont pas de titre de page pertinent ; </li>
          <li>
            Des pages font usage de balises à des fins de présentation (par
            exemple des paragraphes vides) ;
          </li>
          <li>
            Des pages ont une hiérarchie de titres non pertinente (titres
            manquants ou mal définis) ;
          </li>
          <li>La structure des pages sont mal définies ;</li>
          <li>Des suites d’éléments ne sont pas structurées ;</li>
          <li>
            Des boutons de formulaire ont un intitulé qui n’est pas pertinent ;
          </li>
          <li>
            Des aides à la saisie sont absentes pour les champs qui attendent un
            format particulier, et des champs obligatoires ne sont pas
            correctement indiqués ;
          </li>
          <li>
            Certains champs de formulaire qui attendent une donnée personnelle
            de l'utilisateur ne sont pas identifiés.
          </li>
        </ul>
        <Title as='h2' look='h2'>
          Établissement de cette déclaration d’accessibilité
        </Title>
        <Text>Cette déclaration a été établie le 12/05/2022.</Text>
        <Title as='h3' look='h3'>
          Technologies utilisées pour la réalisation du site
        </Title>
        <ul>
          <li>HTML5</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        <Title as='h3' look='h3'>
          Agents utilisateurs, technologies d’assistance et outils utilisés pour
          vérifier l’accessibilité
        </Title>
        <Text>
          Les tests des pages web ont été effectués avec les combinaisons de
          navigateurs web et lecteurs d’écran suivants :
        </Text>
        <ul>
          <li>Firefox 97 et NVDA 2021.3 ;</li>
          <li>Firefox 97 et JAWS 2020 ;</li>
          <li>Safari 15.0 et VoiceOver (macOS Big Sur, version 11.6) ;</li>
          <li>Chrome 96.0 et TalkBack (Android natif 10.0).</li>
        </ul>
        <Text>
          La vérification de l’accessibilité est le résultat de tests manuels,
          assistés par des outils (feuilles CSS dédiés, extensions HeadingsMaps
          et WebDeveloper Toolbar, Color Contrast Analyser).
        </Text>
        <Title as='h3' look='h3'>
          Pages du site ayant fait l’objet de la vérification de conformité
        </Title>
        <ul>
          <li>Accueil : https://bilans-climat-simplifies.ademe.fr/</li>
          <li>Contact : https://bilans-climat-simplifies.ademe.fr/contact</li>
          <li>
            Mentions légales :
            https://bilans-climat-simplifies.ademe.fr/mentionslegales
          </li>
          <li>
            Inscription : https://bilans-climat-simplifies.ademe.fr/inscription
          </li>
        </ul>
        <Title as='h2' look='h2'>
          Retour d’information et contact
        </Title>
        <Text>
          Il est important de rappeler qu’en vertu de l’article 11 de la loi de
          février 2005 :
          <br />
          « la personne handicapée a droit à la compensation des conséquences de
          son handicap, quels que soient l’origine et la nature de sa
          déficience, son âge ou son mode de vie. »
          <br />
          L’ADEME s'engage à prendre les moyens nécessaires afin de donner
          accès, dans un délai raisonnable, aux informations et fonctionnalités
          recherchées par la personne handicapée, que le contenu fasse l'objet
          d'une dérogation ou non. L’ADEME invite les personnes qui
          rencontreraient des difficultés à la contacter [xxx] afin qu’une
          assistance puisse être apportée (alternative accessible, information
          et contenu donnés sous une autre forme).
        </Text>
        <Title as='h2' look='h2'>
          Voies de recours
        </Title>
        <Text>
          Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à
          un contenu ou une fonctionnalité du site, que vous nous le signalez et
          que vous ne parvenez pas à obtenir une réponse de notre part, vous
          êtes en droit de faire parvenir vos doléances ou une demande de
          saisine au Défenseur des droits. Plusieurs moyens sont à votre
          disposition :
        </Text>
        <ul>
          <li>un formulaire de contact ;</li>
          <li>
            la liste du ou des délégués de votre région avec leurs informations
            de contact direct ;
          </li>
          <li>un numéro de téléphone : 09 69 39 00 00 ;</li>
          <li>
            une adresse postale (courrier gratuit, sans affranchissement) : Le
            Défenseur des droits - Libre réponse 71120 - 75342 Paris CEDEX 07.
          </li>
        </ul>
      </Col>
    </Row>
  )
}
