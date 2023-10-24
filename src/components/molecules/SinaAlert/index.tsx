import { Alert, Typography, CircularProgress } from '@mui/material'
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
                sx={{ minHeight: '90px' }}
            >
                <Typography variant="h6">Cargando...</Typography>
                <CircularProgress size={20} />
            </Alert>
        )

    }
    if (isSuccess) {
        return (
            <Alert
                severity="success"
                sx={{ minHeight: '90px' }}
            >
                <Typography variant="h6">Login correcto</Typography>
            </Alert>
        )
    }
    return (
        <Alert
            style={{
                visibility: isError ? 'visible' : 'hidden', // esconde el contenido
                minHeight: '90px' // ajusta 'X' según la altura deseada
            }}
        >
        </Alert>
    )

}

export default SinaAlert