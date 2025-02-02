import { NextApiRequest, NextApiResponse } from 'next'
import { get_result_from_sheet, YED_HEADS_SHEET } from '../sheet-config'

type Submitter = {
  name: string
}
export type GetResponse = {
  prompts: {
    id: number
    title: string
    description: string
    submitter: Submitter
  }[]
  users: Submitter[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const results = await get_result_from_sheet<{
      name: string
      id: number
    }>(YED_HEADS_SHEET, 'members!A:AA')
    if (results) {
      return res.json(
        results
          .filter((r) => r.name !== '')
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    } else return []
  }
  if (req.method == 'POST') {
  }
}
