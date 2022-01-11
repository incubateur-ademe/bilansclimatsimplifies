import React, { useState, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalTitle,
  ModalFooter,
  ModalClose,
} from '@dataesr/react-dsfr'
import { saveAs } from 'file-saver'

import { useExportBilanCsv, useExportBilanXls } from 'hooks/useExport'

export default function DownloadButton(props) {
  const [open, setOpen] = useState(false)

  const { data: csv, refetch: fetchExport } = useExportBilanCsv(props.id)
  const { data: xls, refetch: fetchExportXls } = useExportBilanXls(props.id)

  const bilan = props.bilan
  useEffect(() => {
    if (csv && bilan) {
      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
      hiddenElement.target = '_blank'
      hiddenElement.download = `bilan_${bilan.annee}_${bilan.raisonSociale}.csv`
      hiddenElement.click()
    }
  }, [csv, bilan])
  useEffect(() => {
    if (xls && bilan) {
      saveAs(xls, `bilan_${bilan.annee}_${bilan.raisonSociale}.xls`)
    }
  }, [xls, bilan])

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Télécharger le bilan détaillé
      </Button>
      <Modal isOpen={open} hide={() => setOpen(false)}>
        <ModalClose hide={() => setOpen(false)} title='Fermer'>
          Fermer
        </ModalClose>
        <ModalTitle>Télécharger le bilan détaillé</ModalTitle>

        <ModalFooter>
          <ButtonGroup align='center' isInlineFrom='md'>
            <Button
              onClick={() => {
                setOpen(false)
                fetchExport()
              }}
            >
              Format .csv
            </Button>
            <Button
              onClick={() => {
                setOpen(false)
                fetchExportXls()
              }}
            >
              Format .xls
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </>
  )
}
