import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Title,
  Text,
} from '@dataesr/react-dsfr'

import { useBilan } from 'hooks/useBilans'
import { useEmissions } from 'hooks/useEmissions'
import Emission from './poste/Emission'
import NewEmission from './poste/NewEmission'
import Navigation from './poste/Navigation'

export default function Poste() {
  const { id, poste: posteSlug } = useParams()
  const poste = posteSlug === 'poste1' ? 1 : 2

  const { data: bilan } = useBilan(id)
  const { data: emissions } = useEmissions(id)

  return (
    <>
      <Row gutters>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem href='/bilans'>Mes bilans</BreadcrumbItem>
            <BreadcrumbItem href={`/bilans/${id}`}>
              {bilan?.raisonSociale} - {bilan?.annee}
            </BreadcrumbItem>
            <BreadcrumbItem>Poste {poste}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <Title as='h1'>
            {bilan?.raisonSociale} - {bilan?.annee} - Poste {poste}
          </Title>
          <Text>
            La scope 1 concerne tous les gaz à effet de serre émis directement
            par l'entreprise : le chauffage dans les locaux, les émissions des
            véhicules détenus par l'entreprise, etc.
          </Text>
        </Col>
      </Row>
      {emissions
        ?.filter((emission) => emission.poste === poste)
        ?.map((emission) => (
          <Emission key={emission.id} emission={emission} />
        ))}
      <NewEmission
        bilan={id}
        poste={poste}
        empty={
          emissions?.filter((emission) => emission.poste === poste).length
            ? false
            : true
        }
      />
      <br />
      <br />
      <Navigation bilan={bilan} poste={poste} id={id} />
    </>
  )
}
