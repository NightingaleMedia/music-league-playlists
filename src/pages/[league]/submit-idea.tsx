import { PageLayout } from '@/components/layouts/Page'
import { useGetAllMembers } from '@/hooks/useGetAllMembers'
import {
  Button,
  FormLabel,
  Input,
  Select,
  Sheet,
  Textarea,
  Option,
  Typography,
  CircularProgress,
  Snackbar,
} from '@mui/joy'
import Link from 'next/link'
import { useState } from 'react'

const initialState = {
  title: '',
  description: '',
  submitter: '',
}
export default function SubmitPage() {
  const { submitters, loading: membersLoading } = useGetAllMembers()

  const [values, setValues] = useState(initialState)
  const [successOpen, setSuccessOpen] = useState(false)
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
      .then(() => {
        setSuccessOpen(true)
        setValues(initialState)
      })
  }
  return (
    <PageLayout>
      <Sheet
        sx={{
          backgroundColor: 'white',
          mx: 2,
          py: 2,
          mt: 2,
          borderRadius: '12px',
          minHeight: '550px',
        }}
      >
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
                  setValues((prev) => ({ ...prev, submitter: value ?? '' }))
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
            <Button
              variant="solid"
              sx={{ width: '100%' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Sheet>
        </Sheet>
      </Sheet>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successOpen}
        variant={'soft'}
        color={'success'}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return
          }
          setSuccessOpen(false)
        }}
      >
        We added that shit!
      </Snackbar>
    </PageLayout>
  )
}
