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

import { useExportCsv, useExportXls } from 'hooks/useExport'

export default function DownloadButton(props) {
  const [open, setOpen] = useState(false)

  const { data: csv, refetch: fetchExport } = useExportCsv()
  const { data: xls, refetch: fetchExportXls } = useExportXls()

  useEffect(() => {
    if (csv) {
      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
      hiddenElement.target = '_blank'
      hiddenElement.download = `bilans.csv`
      hiddenElement.click()
    }
  }, [csv])
  useEffect(() => {
    if (xls) {
      saveAs(xls, `bilans.xls`)
    }
  }, [xls])

  return (
    <>
      <Button onClick={() => setOpen(true)}>Exporter les bilans</Button>
      <Modal isOpen={open} hide={() => setOpen(false)}>
        <ModalClose hide={() => setOpen(false)} title='Fermer'>
          Fermer
        </ModalClose>
        <ModalTitle>Exporter les bilans</ModalTitle>

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
