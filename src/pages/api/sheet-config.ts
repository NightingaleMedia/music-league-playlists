// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { google, drive_v3, sheets_v4 } from 'googleapis'

const TOKEN_PATH = 'google-creds.json'

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
]

export const auth = new google.auth.GoogleAuth({
  keyFile: TOKEN_PATH,
  scopes: SCOPES,
})
export const SHEETS: sheets_v4.Sheets = google.sheets({
  version: 'v4',
  auth: auth,
})

export const DRIVE: drive_v3.Drive = google.drive({
  version: 'v3',
  auth: auth,
})
export const YED_HEADS_SHEET = '1xBY4Nm_25W-sMfYVTKUucijlMa_2Vd9yRitpfczSCWY'

export const get_json_from_result = (values: any[]): any => {
  const headers: string[] = values?.shift()
  const v = values.map((v: any, rowNumber) => {
    const singleValue = {}
    v.forEach((value: any, index: any) => {
      singleValue[headers[index]] = value
      singleValue['id'] = rowNumber + 1
    })
    return singleValue
  })
  return v
}

export async function update_rows(
  data: any[][],
  spreadsheetId: string,
  range: string
) {
  await SHEETS.spreadsheets.values.append(
    {
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: data,
      },
    },
    (err: any, res: any) => {
      if (err) return
    }
  )
}

export async function get_result_from_sheet<T>(
  spreadsheet_id: string,
  range: string
): Promise<T[] | null> {
  let result = null
  const vals = await SHEETS.spreadsheets.values
    .get({
      spreadsheetId: spreadsheet_id,
      range: range,
    })
    .then((res) => res.data.values)

  if (vals) {
    result = get_json_from_result(vals)
  }
  return result
}
export const get_raw_result_from_sheet = async (
  spreadsheet_id: string,
  range: string,
  majorDimension: 'ROWS' | 'COLUMNS' = 'ROWS'
): Promise<any> => {
  return await SHEETS.spreadsheets.values
    .get({
      spreadsheetId: spreadsheet_id,
      range: range,
      majorDimension,
    })
    .then((res) => res.data.values)
}

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
