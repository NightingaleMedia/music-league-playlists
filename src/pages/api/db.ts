import { NextApiRequest, NextApiResponse } from 'next'
import {
  get_result_from_sheet,
  update_rows,
  YED_HEADS_SHEET,
} from './sheet-config'

export type Submitter = {
  id: number
  name: string
  color: string
}

export type Submission = {
  id: number
  title: string
  description: string
  submitter: Submitter
  status: 'upcoming' | 'inthequeue' | 'completed'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const results = await get_result_from_sheet<{
      id: number
      title: string
      description: string
      submitter: Submitter | null
    }>(YED_HEADS_SHEET, 'submissions!A:D')
    const allMembers = await get_result_from_sheet<Submitter>(
      YED_HEADS_SHEET,
      'members!A:AA'
    )

    results?.forEach((result) => {
      const foundsubmitter =
        allMembers?.find((m) => m.name == result.submitter) ?? null

      result.submitter = foundsubmitter
    })
    res.json(results)
  }
  if (req.method == 'POST') {
    console.log(req.body)
    const { title, description, submitter } = req.body

    if (!title || !description || !submitter) {
      return res.json({ message: 'Need all the fields fucker!' })
    }

    update_rows(
      [[title, description, submitter]],
      YED_HEADS_SHEET,
      'submissions!A:C'
    )
    return res.json({ message: 'ok' })
  }
}
