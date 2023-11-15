import { Alert, Typography, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import { isError } from 'util'

const SinaAlert = ({ isError, isPending, isSuccess }: any) => {
    if (isError) {
        return (
            <Alert
                severity="error"
                style={{ minHeight: '90px' }}
            >
                <Typography variant="h6">Datos incorrectos.</Typography>
                <Typography variant="body2">
                    Nombre de usuario y/o clave erróneos. Por favor, verifica tus credenciales e inténtalo de nuevo.
                </Typography>
            </Alert>
        )
    }
    if (isPending) {
        return (
            <Alert
                severity="info"
                icon={<></>}
            >
                <Stack overflow={'hidden'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                    <CircularProgress size={20} />    
                    <Typography paddingLeft='20px' variant="h6">Cargando...</Typography>    
                </Stack>
            </Alert>
        )

    }
    if (isSuccess) {
        return (
            <Alert
                severity="success"
            >
                <Typography variant="h6">Login correcto</Typography>
            </Alert>
        )
    }
}

export default SinaAlert