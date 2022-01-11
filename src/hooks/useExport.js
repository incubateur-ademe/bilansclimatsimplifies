import { useQuery } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useExport() {
  return useQuery(
    ['privateExportCsv'],
    () => axios.get(`${apiUrl}/export/`).then((res) => res.data),
    { enabled: false }
  )
}

export function useExportBilanCsv(id) {
  return useQuery(
    ['exportCsv', id],
    () => axios.get(`${apiUrl}/emissionsExport/${id}`).then((res) => res.data),
    { enabled: false }
  )
}
export function useExportBilanXls(id) {
  return useQuery(
    ['exportXls', id],
    () =>
      axios
        .get(`${apiUrl}/emissionsXlsxExport/${id}`, {
          responseType: 'blob',
        })
        .then((res) => res.data),
    { enabled: false }
  )
}
