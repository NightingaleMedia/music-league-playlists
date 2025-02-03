import { Submission, Submitter } from '@/pages/api/db'
import { Chip, Sheet, Typography } from '@mui/joy'
import tinycolor from 'tinycolor2'

function getTextColor(hexColor: string) {
  const color = tinycolor(hexColor)
  return color.isLight() ? '#000000' : '#ffffff'
}

const statusMap = {
  upcoming: 'Upcoming',
  completed: 'Completed',
  inthequeue: 'In The Queue',
}
export const SingleIdea = (props: {
  title: string
  description: string
  status: Submission['status']
  submitter: Submitter
}) => {
  return (
    <Sheet
      key={props.title}
      sx={{
        py: 2,
        px: 2,
        backgroundColor:
          props.status === 'completed' ? 'rgba(255,255,255,0.5)' : 'white',
        borderRadius: '12px',
        mb: 2,
      }}
    >
      <Typography level="title-lg" sx={{ mb: 2 }}>
        {props.title}
      </Typography>
      <Typography level="body-sm" sx={{ mb: 2 }}>
        {props.description}
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Typography level="body-sm">Submitted By:</Typography>
        <Chip
          sx={{
            backgroundColor: props.submitter.color,
            minWidth: '50px',
            textAlign: 'center',
            color: getTextColor(props.submitter.color),
          }}
        >
          <strong>{props.submitter.name}</strong>
        </Chip>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Typography level="body-sm">
          Status: <strong>{statusMap[props.status]}</strong>
        </Typography>
      </div>
    </Sheet>
  )
}
