import React, { useEffect } from 'react'
import { Button } from '@dataesr/react-dsfr'

import { useExportBilan } from 'hooks/useExport'

export default function DownloadButton(props) {
  const { data: csv, refetch: fetchExport } = useExportBilan(props.id)

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

  return <Button onClick={fetchExport}>Télécharger ce bilan</Button>
}
