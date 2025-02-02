import { useEffect, useState } from 'react'
import { Submission } from '@/pages/api/db'

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
        console.log(res)
        setSubs(res)
      })
      .finally(() => setLoading(false))
  }, [])

  return { loading, submissions }
}
