import { useQuery } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useExport() {
  return useQuery(
    ['export'],
    () => axios.get(`${apiUrl}/export/`).then((res) => res.data),
    { enabled: false }
  )
}

export function useExportBilan(id) {
  return useQuery(
    ['export', id],
    () => axios.get(`${apiUrl}/emissionsExport/${id}`).then((res) => res.data),
    { enabled: false }
  )
}
