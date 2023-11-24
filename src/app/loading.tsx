import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

export default function Loading() {
  return (
    <Stack width={'100vw'} height={'100vh'} flex={1} justifyContent={'center'} alignItems={'center'}>
      <CircularProgress/>
    </Stack>
  )
}