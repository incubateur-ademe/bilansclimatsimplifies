import { useMutation } from 'react-query'
import axios from 'axios'

export default function useContact() {
  return useMutation((contact) => axios.post(`/`, contact))
}
