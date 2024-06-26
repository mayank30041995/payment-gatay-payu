import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function SimplePaper({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 750,
          height: 500,
        },
      }}
    >
      <Paper elevation={12}>{children}</Paper>
    </Box>
  )
}
