import { SingleIdea } from '@/components/SingleIdea'
import { useGetAllSubmissions } from '@/hooks/useGetAllSubmissions'
import { Button, CircularProgress, Sheet, Typography } from '@mui/joy'

import Link from 'next/link'

export default function UpcomingRoundsPage() {
  const { submissions, loading: subsLoading } = useGetAllSubmissions()
  return (
    <Sheet
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      <Sheet sx={{ minHeight: '100px' }}>
        <Typography level="h1" variant="plain" sx={{ textAlign: 'center' }}>
          Playlist Ideas
        </Typography>
        <Typography
          level="body-sm"
          variant="plain"
          sx={{ textAlign: 'center' }}
        >
          This is our backlog of ideas, we will vote on the best upcoming ones,
          or maybe just pick a random bunch
        </Typography>
        <Link href="/yedheads/submit-idea">
          <Button variant="plain" sx={{ width: '100%' }}>
            Add A New Idea
          </Button>
        </Link>
      </Sheet>
      <Sheet
        sx={{
          overflowY: 'scroll',
          height: 'calc(100vh - 100px)',
          pb: 10,
          pt: 3,
          backgroundColor: '#202020',
        }}
      >
        {subsLoading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          submissions.map((d) => (
            <SingleIdea
              key={d.id}
              title={d.title}
              description={d.description}
              submitter={d.submitter}
            />
          ))
        )}
        <Link href="/yedheads/submit-idea">
          <Button variant="plain" sx={{ width: '100%', mt: 5 }}>
            Add A New Idea
          </Button>
        </Link>
      </Sheet>
    </Sheet>
  )
}
