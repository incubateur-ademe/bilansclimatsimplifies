import { useEffect } from 'react'

import { toast } from 'react-toastify'

export function useToast(mutation) {
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
}
