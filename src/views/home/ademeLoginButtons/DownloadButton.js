import React, { useEffect } from 'react'
import { Button } from '@dataesr/react-dsfr'

import { useExport } from 'hooks/useExport'

export default function DownloadButton() {
  const { data: csv, refetch: fetchExport } = useExport()

  useEffect(() => {
    if (csv) {
      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
      hiddenElement.target = '_blank'
      hiddenElement.download = 'bilans.csv'
      hiddenElement.click()
    }
  }, [csv])

  return (
    <Button secondary onClick={fetchExport}>
      Exporter les bilans
    </Button>
  )
}
