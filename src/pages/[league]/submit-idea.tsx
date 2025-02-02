import { useGetAllMembers } from '@/hooks/useGetAllMembers'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Sheet,
  Textarea,
  Option,
  Typography,
  CircularProgress,
} from '@mui/joy'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const initialState = {
  title: '',
  description: '',
  submitter: '',
}
export default function SubmitPage() {
  const { submitters, loading: membersLoading } = useGetAllMembers()

  const [values, setValues] = useState(initialState)

  const handleSubmit = () => {
    fetch('/api/db', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        ...values,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setValues(initialState)
      })
  }
  return (
    <Sheet sx={{ height: '90vh' }}>
      <Typography level="h1" sx={{ textAlign: 'center', mt: 2 }}>
        Submit An Idea
      </Typography>

      <Link href="/yedheads/upcoming-rounds">
        <Button sx={{ margin: 'auto', width: '100%' }} variant="plain">
          See The List
        </Button>
      </Link>
      <Sheet
        sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div>
          <FormLabel>Title</FormLabel>
          <Input
            value={values.title}
            onChange={(v) => {
              setValues((prev) => ({ ...prev, title: v.target.value }))
            }}
            type="text"
          ></Input>
        </div>
        <div>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={values.description}
            onChange={(v) => {
              setValues((prev) => ({ ...prev, description: v.target.value }))
            }}
            minRows={5}
            placeholder="Type anything…"
          />
        </div>
        {membersLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <FormLabel>Who Is You</FormLabel>
            <Select
              value={values.submitter}
              onChange={(v, value) => {
                setValues((prev) => ({ ...prev, submitter: value }))
              }}
            >
              {submitters.map((s) => (
                <Option key={s.id} value={s.name} sx={{ color: s.color }}>
                  <strong>{s.name}</strong>
                </Option>
              ))}
            </Select>
          </div>
        )}
        <Sheet sx={{ mt: 4, width: '100%' }}>
          <Button variant="solid" sx={{ width: '100%' }} onClick={handleSubmit}>
            Submit
          </Button>
        </Sheet>
      </Sheet>
    </Sheet>
  )
}
