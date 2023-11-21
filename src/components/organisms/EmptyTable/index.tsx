import SinaText from '@/components/atoms/SinaText';
import { Stack } from '@mui/material';
import React from 'react';

const styles = {
  title: {
    color: '#212121',
    textAlign: 'center' as const,
    fontFamily: 'Montserrat',
    fontSize: '22px',
    fontWeight: '700',
    lineHeight: '32.5px',
    paddingBottom:'10px'
  }
}
export const EmptyTable = ({filterBy="", input=""}: {filterBy?: string, input?: string}) => (
  <Stack
    justifyContent={'center'}
    alignItems={'center'}
    flex={1}
  >
    <Stack justifyContent={'center'} padding={20} alignItems={'center'}>
      <p style={styles.title} >
        Lo sentimos, no se encontraron resultados
      </p>
      <p>
        La búsqueda de <strong>{filterBy} {input}</strong> no arrojó ningún resultado. 
      </p>
      <p>
        Verifica la información o intenta reajustar la búsqueda
      </p>
    </Stack>
  </Stack>
)