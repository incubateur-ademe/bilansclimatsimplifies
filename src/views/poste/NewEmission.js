import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import {
  Button,
  ButtonGroup,
  TextInput,
  Callout,
  CalloutText,
} from '@dataesr/react-dsfr'

import { useEmissionsCreation } from 'hooks/useEmissions'
import TypeSelector from './emission/TypeSelector'
import UnitSelector from './emission/UnitSelector'

const Wrapper = styled.form`
  border: 1px solid rgb(232, 232, 232);
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`
const Values = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    flex: 1;
  }
`

export default function NewEmission(props) {
  const [open, setOpen] = useState(false)

  const [type, setType] = useState('')
  const [valeur, setValeur] = useState('')
  const [unite, setUnite] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    setType('')
    setValeur('')
    setUnite('')
    setNote('')
  }, [open])

  const poste = props.poste
  useEffect(() => {
    setOpen(false)
  }, [poste])

  const mutation = useEmissionsCreation()

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.dismiss()
      toast.success('Bilan sauvegardé.')
    }
  }, [mutation.isSuccess])
  useEffect(() => {
    if (mutation.isError) {
      toast.dismiss()
      toast.error(`Vos modifications n'ont pas été sauvegardées.`)
    }
  }, [mutation.isError])

  return open ? (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(
          {
            bilan: props.bilan,
            poste: props.poste,
            type,
            valeur: String(valeur).replace(',', '.'),
            unite,
            note,
          },
          { onSuccess: () => setOpen(false) }
        )
      }}
    >
      <TypeSelector value={type} onChange={setType} poste={props.poste} />
      <Values>
        <TextInput
          type='text'
          inputmode='numeric'
          pattern='[0-9]*'
          label={`Valeur`}
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
          required
        />
        <UnitSelector value={unite} onChange={setUnite} type={type} />
      </Values>
      <TextInput
        label={`Note`}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <ButtonGroup isInlineFrom='md' align='right'>
        <Button secondary onClick={() => setOpen(false)}>
          Annuler
        </Button>
        <Button submit>Ajouter une source d'émission</Button>
      </ButtonGroup>
    </Wrapper>
  ) : (
    <>
      {props.empty ? (
        <>
          <Callout hasInfoIcon={false}>
            {props.poste === 1 ? (
              <>
                <CalloutText>
                  Le poste 1 du Bilan Climat Simplifié correspond aux émissions
                  directes de GES des sources fixes contrôlées par votre
                  entreprise. Autrement dit, il s’agit des émissions liées à la
                  combustion d’un combustible au sein de ces sources fixes que
                  sont un brûleur, une turbine, une chaudière, un groupe
                  électrogène, etc.
                  <br />
                  <br />
                </CalloutText>
                <CalloutText>
                  Cette combustion peut servir à produire de la chaleur, un
                  travail mécanique ou de l’électricité. Les combustibles
                  concernés peuvent être d’origine fossile (produits pétroliers,
                  houille, gaz, etc.) ou biogénique (biomasse, déchets
                  organiques, etc.).
                  <br />
                  <br />
                </CalloutText>
                <CalloutText>
                  Pour faire le calcul, il faut vous munir des quantités de
                  combustibles utilisées (en kWh ou en litre ou en kg ou …) par
                  type de combustible (fioul, gaz naturel, plaquettes
                  forestières, etc.). Ces données sont à collecter, pour l’année
                  de reporting, au niveau des factures d’achat ou de livraison
                  de combustibles, ou des compteurs d’énergie. Elles doivent
                  être agrégées au périmètre de votre entreprise.
                  <br />
                  <br />
                </CalloutText>
              </>
            ) : (
              <>
                <CalloutText>
                  Le poste 2 du Bilan Climat Simplifié correspond aux émissions
                  directes de GES des sources mobiles contrôlées par votre
                  entreprise. Autrement dit, il s’agit des émissions liées à la
                  combustion de carburant au sein de ces sources mobiles, que
                  sont les véhicules terrestres (voiture, tracteur, camion,
                  chariots élévateurs, etc.), aériens (avion, jet, etc.),
                  ferroviaires (train, métro), maritimes ou fluviaux.
                  <br />
                  <br />
                </CalloutText>
                <CalloutText>
                  Le Poste 2 ne concerne que l’utilisation des sources mobiles
                  contrôlées par l’entreprise, cela n’inclut pas les
                  déplacements professionnels des salariés via des modes de
                  transport non contrôlés par l’entreprise, ou les déplacements
                  domicile-travail des salariés (hors véhicule de fonction), le
                  déplacement des clients ou des visiteurs, etc. Pour faire le
                  calcul, il faut vous munir des quantités de carburants
                  consommées (en kWh ou en litre ou …) par type de carburant
                  (essence, diesel, GNC, etc.). Ces données sont à collecter,
                  pour l’année de reporting, au niveau des factures de
                  carburant. Si les quantités consommées pour chaque carburant
                  ne sont pas accessibles, il est possible d’extrapoler
                  l’évaluation des émissions à partir du kilométrage parcouru et
                  du tonnage transporté par type de véhicule. Les quantités
                  doivent être agrégées au périmètre de votre entreprise.
                  <br />
                  <br />
                </CalloutText>
              </>
            )}
            <ButtonGroup isInlineFrom='md' align='right'>
              <Button onClick={() => setOpen(true)}>
                Ajouter une source d'émission
              </Button>
            </ButtonGroup>
          </Callout>
          <br />
        </>
      ) : (
        <ButtonGroup isInlineFrom='md' align='right'>
          <Button onClick={() => setOpen(true)}>
            Ajouter une source d'émission
          </Button>
        </ButtonGroup>
      )}
    </>
  )
}
