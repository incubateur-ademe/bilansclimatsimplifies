import { useQuery } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useExport(isStaff) {
  return useQuery(
    ['export', isStaff],
    () => axios.get(`${apiUrl}/export/`).then((res) => res.data),
    { enabled: isStaff ? true : false }
  )
}
