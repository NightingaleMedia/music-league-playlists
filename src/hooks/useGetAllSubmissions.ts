import { useEffect, useState } from 'react'
import { Submission } from '@/pages/api/db'
import { customSort } from '@/util/sortManual'

export const useGetAllSubmissions = (): {
  loading: boolean
  submissions: Submission[]
} => {
  const [loading, setLoading] = useState(true)
  const [submissions, setSubs] = useState<Submission[]>([])

  useEffect(() => {
    fetch('/api/db')
      .then((res) => res.json())
      .then((res) => {
        const sorted = customSort(
          res,
          ['inthequeue', 'upcoming', 'completed'],
          'status'
        )
        setSubs(sorted)
      })
      .finally(() => setLoading(false))
  }, [])

  return { loading, submissions }
}
