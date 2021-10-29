import { useMutation } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useLoginUser() {
  return useMutation((user) => axios.get(`${apiUrl}/user.json`, user))
}
