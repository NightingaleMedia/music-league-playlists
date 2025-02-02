import { Member } from '@/hooks/useGetAllMembers'
import { Chip, Sheet, Typography } from '@mui/joy'
import tinycolor from 'tinycolor2'

function getTextColor(hexColor) {
  const color = tinycolor(hexColor)
  return color.isLight() ? '#000000' : '#ffffff'
}

export const SingleIdea = (props: {
  title: string
  description: string
  submitter: Member
}) => {
  return (
    <Sheet key={props.title} sx={{ py: 1, px: 2, backgroundColor: '#202020' }}>
      <Sheet
        key={props.title}
        sx={{ py: 2, px: 2, backgroundColor: 'white', borderRadius: '12px' }}
      >
        <Typography level="h3" sx={{ mb: 2 }}>
          {props.title}
        </Typography>
        <Typography level="body-md" sx={{ mb: 2 }}>
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
      </Sheet>
    </Sheet>
  )
}
