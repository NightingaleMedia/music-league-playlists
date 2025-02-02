import { Submitter } from '@/pages/api/db'
import { useEffect, useState } from 'react'

export const useGetAllMembers = (): {
  loading: boolean
  submitters: Submitter[]
} => {
  const [loading, setLoading] = useState(true)
  const [submitters, setSubmitters] = useState<
    { id: number; name: string; color: string }[]
  >([])

  useEffect(() => {
    fetch('/api/yedheads/members')
      .then((res) => res.json())
      .then((res) => {
        setSubmitters(res)
      })
      .finally(() => setLoading(false))
  }, [])

  return { loading, submitters }
}
