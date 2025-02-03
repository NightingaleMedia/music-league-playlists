import { Sheet } from '@mui/joy'

export const PageLayout = ({ children }: any) => {
  return (
    <Sheet sx={{ backgroundColor: '#202020' }}>
      <Sheet
        sx={{
          maxWidth: '500px',
          margin: 'auto',
          minHeight: '100vh',
          overflow: 'hidden',
          backgroundColor: 'inherit',
        }}
      >
        {children}
      </Sheet>{' '}
    </Sheet>
  )
}
