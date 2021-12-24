import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  validateSiren,
  validateNombreSalaries,
  validateAnnee,
} from 'utils/validators'
import { useBilansCreation } from 'hooks/useBilans'
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
  ButtonGroup,
  Button,
  TextInput,
  Select,
} from '@dataesr/react-dsfr'
import MagicLink from 'components/base/MagicLink'

export default function AddBilan() {
  const history = useHistory()

  const [raisonSociale, setRaisonSociale] = useState('')
  const [nombreSalaries, setNombreSalaries] = useState('')
  const [siren, setSiren] = useState('')
  const [naf, setNaf] = useState('')
  const [region, setRegion] = useState('')
  const [annee, setAnnee] = useState('')

  const mutation = useBilansCreation()

  const [errors, setErrors] = useState([])

  return (
    <>
      <Row gutters>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem href='/bilans'>Mes bilans</BreadcrumbItem>
            <BreadcrumbItem>Nouveau</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutation.reset()
              setErrors([])
              if (!validateSiren(siren)) {
                setErrors((prevErrors) => [...prevErrors, 'siren'])
              }
              if (!validateNombreSalaries(nombreSalaries)) {
                setErrors((prevErrors) => [...prevErrors, 'nombreSalaries'])
              }
              if (!validateAnnee(annee)) {
                setErrors((prevErrors) => [...prevErrors, 'annee'])
              }

              if (!errors.length) {
                mutation.mutate(
                  {
                    raisonSociale,
                    nombreSalaries,
                    siren,
                    naf,
                    region,
                    annee,
                  },
                  {
                    onSuccess: (data) => {
                      history.push(`/bilans/${data.data.id}/type`)
                    },
                  }
                )
              }
            }}
          >
            <TextInput
              label={`Raison sociale`}
              value={raisonSociale}
              onChange={(e) => setRaisonSociale(e.target.value)}
              required
            />
            <TextInput
              label={`Nombre de salariés`}
              hint='Ce bilan est réservé aux entreprises de 50 à 500 salariés'
              value={nombreSalaries}
              onChange={(e) => setNombreSalaries(e.target.value)}
              messageType={errors.includes('nombreSalaries') ? 'error' : null}
              required
            />
            <TextInput
              label={`SIREN`}
              value={siren}
              onChange={(e) => setSiren(e.target.value)}
              messageType={errors.includes('siren') ? 'error' : null}
              required
            />
            <Select
              label={`Section de nomenclature (code NAF, niveau I)`}
              options={[
                {
                  value: '',
                  label: '',
                  disabled: true,
                  hidden: true,
                },
                {
                  value: '01',
                  label:
                    'Culture et production animale, chasse et services annexes',
                },
                {
                  value: '02',
                  label: 'Sylviculture et exploitation forestière',
                },
                { value: '03', label: 'Pêche et aquaculture' },
                { value: '05', label: 'Extraction de houille et de lignite' },
                { value: '06', label: "Extraction d'hydrocarbures" },
                { value: '07', label: 'Extraction de minerais métalliques' },
                { value: '08', label: 'Autres industries extractives' },
                {
                  value: '09',
                  label: 'Services de soutien aux industries extractives',
                },
                { value: '10', label: 'Industries alimentaires' },
                { value: '11', label: 'Fabrication de boissons' },
                {
                  value: '12',
                  label: 'Fabrication de produits à base de tabac',
                },
                { value: '13', label: 'Fabrication de textiles' },
                { value: '14', label: "Industrie de l'habillement" },
                {
                  value: '15',
                  label: 'Industrie du cuir et de la chaussure',
                },
                {
                  value: '16',
                  label:
                    "Travail du bois et fabrication d'articles en bois et en liège, à l'exception des meubles ; fabrication d'articles en vannerie et sparterie",
                },
                { value: '17', label: 'Industrie du papier et du carton' },
                {
                  value: '18',
                  label: "Imprimerie et reproduction d'enregistrements",
                },
                { value: '19', label: 'Cokéfaction et raffinage' },
                { value: '20', label: 'Industrie chimique' },
                { value: '21', label: 'Industrie pharmaceutique' },
                {
                  value: '22',
                  label:
                    'Fabrication de produits en caoutchouc et en plastique',
                },
                {
                  value: '23',
                  label:
                    "Fabrication d'autres produits minéraux non métalliques",
                },
                { value: '24', label: 'Métallurgie' },
                {
                  value: '25',
                  label:
                    "Fabrication de produits métalliques, à l'exception des machines et des équipements",
                },
                {
                  value: '26',
                  label:
                    'Fabrication de produits informatiques, électroniques et optiques',
                },
                {
                  value: '27',
                  label: "Fabrication d'équipements électriques",
                },
                {
                  value: '28',
                  label: 'Fabrication de machines et équipements n.c.a.',
                },
                { value: '29', label: 'Industrie automobile' },
                {
                  value: '30',
                  label: "Fabrication d'autres matériels de transport",
                },
                { value: '31', label: 'Fabrication de meubles' },
                { value: '32', label: 'Autres industries manufacturières' },
                {
                  value: '33',
                  label:
                    "Réparation et installation de machines et d'équipements",
                },
                {
                  value: '35',
                  label:
                    "Production et distribution d'électricité, de gaz, de vapeur et d'air conditionné",
                },
                {
                  value: '36',
                  label: "Captage, traitement et distribution d'eau",
                },
                {
                  value: '37',
                  label: 'Collecte et traitement des eaux usées',
                },
                {
                  value: '38',
                  label:
                    'Collecte, traitement et élimination des déchets ; récupération',
                },
                {
                  value: '39',
                  label:
                    'Dépollution et autres services de gestion des déchets',
                },
                { value: '41', label: 'Construction de bâtiments' },
                { value: '42', label: 'Génie civil' },
                { value: '43', label: 'Travaux de construction spécialisés' },
                {
                  value: '45',
                  label:
                    "Commerce et réparation d'automobiles et de motocycles",
                },
                {
                  value: '46',
                  label:
                    "Commerce de gros, à l'exception des automobiles et des motocycles",
                },
                {
                  value: '47',
                  label:
                    "Commerce de détail, à l'exception des automobiles et des motocycles",
                },
                {
                  value: '49',
                  label: 'Transports terrestres et transport par conduites',
                },
                { value: '50', label: 'Transports par eau' },
                { value: '51', label: 'Transports aériens' },
                {
                  value: '52',
                  label: 'Entreposage et services auxiliaires des transports',
                },
                { value: '53', label: 'Activités de poste et de courrier' },
                { value: '55', label: 'Hébergement' },
                { value: '56', label: 'Restauration' },
                { value: '58', label: 'Edition' },
                {
                  value: '59',
                  label:
                    'Production de films cinématographiques, de vidéo et de programmes de télévision ; enregistrement sonore et édition musicale',
                },
                { value: '60', label: 'Programmation et diffusion' },
                { value: '61', label: 'Télécommunications' },
                {
                  value: '62',
                  label:
                    'Programmation, conseil et autres activités informatiques',
                },
                { value: '63', label: "Services d'information" },
                {
                  value: '64',
                  label:
                    'Activités des services financiers, hors assurance et caisses de retraite',
                },
                { value: '65', label: 'Assurance' },
                {
                  value: '66',
                  label:
                    "Activités auxiliaires de services financiers et d'assurance",
                },
                { value: '68', label: 'Activités immobilières' },
                { value: '69', label: 'Activités juridiques et comptables' },
                {
                  value: '71',
                  label:
                    "Activités d'architecture et d'ingénierie ; activités de contrôle et analyses techniques",
                },
                {
                  value: '72',
                  label: 'Recherche-développement scientifique',
                },
                { value: '73', label: 'Publicité et études de marché' },
                {
                  value: '74',
                  label:
                    'Autres activités spécialisées, scientifiques et techniques',
                },
                { value: '75', label: 'Activités vétérinaires' },
                {
                  value: '77',
                  label: 'Activités de location et location-bail',
                },
                { value: '78', label: "Activités liées à l'emploi" },
                {
                  value: '79',
                  label:
                    'Activités des agences de voyage, voyagistes, services de réservation et activités connexes',
                },
                { value: '80', label: 'Enquêtes et sécurité' },
                {
                  value: '81',
                  label:
                    'Services relatifs aux bâtiments et aménagement paysager',
                },
                {
                  value: '82',
                  label:
                    'Activités administratives et autres activités de soutien aux entreprises',
                },
                {
                  value: '84',
                  label:
                    'Administration publique et défense ; sécurité sociale obligatoire',
                },
                { value: '85', label: 'Enseignement' },
                { value: '86', label: 'Activités pour la santé humaine' },
                { value: '87', label: 'Hébergement médico-social et social' },
                { value: '88', label: 'Action sociale sans hébergement' },
                {
                  value: '90',
                  label: 'Activités créatives, artistiques et de spectacle',
                },
                {
                  value: '91',
                  label:
                    'Bibliothèques, archives, musées et autres activités culturelles',
                },
                {
                  value: '92',
                  label: "Organisation de jeux de hasard et d'argent",
                },
                {
                  value: '93',
                  label: 'Activités sportives, récréatives et de loisirs',
                },
                {
                  value: '94',
                  label: 'Activités des organisations associatives',
                },
                {
                  value: '95',
                  label:
                    "Réparation d'ordinateurs et de biens personnels et domestiques",
                },
                { value: '96', label: 'Autres services personnels' },
                {
                  value: '97',
                  label:
                    "Activités des ménages en tant qu'employeurs de personnel domestique",
                },
                {
                  value: '98',
                  label:
                    'Activités indifférenciées des ménages en tant que producteurs de biens et services pour usage propre',
                },
                {
                  value: '99',
                  label:
                    'Activités des organisations et organismes extraterritoriaux',
                },
              ].sort((a, b) => (a.label > b.label ? 1 : -1))}
              selected={naf}
              onChange={(e) => setNaf(e.target.value)}
              required
            />
            <Select
              label={`Région du siège de l’entreprise`}
              options={[
                {
                  value: '',
                  label: '',
                  disabled: true,
                  hidden: true,
                },
                { value: '01', label: 'Guadeloupe' },
                { value: '02', label: 'Martinique' },
                { value: '03', label: 'Guyane' },
                { value: '04', label: 'La Réunion' },
                { value: '06', label: 'Mayotte' },
                { value: '11', label: 'Île-de-France' },
                { value: '24', label: 'Centre-Val de Loire' },
                { value: '27', label: 'Bourgogne-Franche-Comté' },
                { value: '28', label: 'Normandie' },
                { value: '32', label: 'Hauts-de-France' },
                { value: '44', label: 'Grand Est' },
                { value: '52', label: 'Pays de la Loire' },
                { value: '53', label: 'Bretagne' },
                { value: '75', label: 'Nouvelle-Aquitaine' },
                { value: '76', label: 'Occitanie' },
                { value: '84', label: 'Auvergne-Rhône-Alpes' },
                { value: '93', label: "Provence-Alpes-Côte d'Azur" },
                { value: '94', label: 'Corse' },
              ]}
              selected={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />

            <TextInput
              label={`Année de reporting du bilan`}
              hint='Année n, n-1 ou n-2 par rapport à l’année en cours'
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              messageType={errors.includes('annee') ? 'error' : null}
              required
            />
            <ButtonGroup isInlineFrom='md' align='right'>
              <MagicLink to='/bilans'>
                <Button secondary>Annuler</Button>
              </MagicLink>
              <Button submit>Commencer mon bilan</Button>
            </ButtonGroup>
            {mutation.isError && (
              <Alert type='error' title='Une erreur est survenue' />
            )}
          </form>
        </Col>
      </Row>
    </>
  )
}
