import { Paper } from '@mui/material'
import React from 'react'

const ContainerLogin = ({ children }: any) => {
    return (
        <Paper
            elevation={1}
            sx={{
                display: "grid",
                gridTemplateRows: "auto auto auto 1fr auto",
                padding: "10px 2em",
                width: "38vw",
                gap: ".5rem",
                borderRadius: "10px",
                minHeight: "70vh",
                maxHeight: "85vh",
                boxSizing: "border-box",
                overflowY: "auto",
                textAlign:"center"
            }}
        >
            {children}
        </Paper>
    )
}

export default ContainerLogin