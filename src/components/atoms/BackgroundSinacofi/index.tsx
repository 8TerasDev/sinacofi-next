import { Box } from '@mui/material'
import React from 'react'

const BackgroundSinacofi = ({ children }: any) => {
    return (
        <Box
            sx={{
                display: "grid",
                width: "100vw",
                height: "100vh",
                background:
                    "linear-gradient(295deg, rgba(226, 51, 106, 0.70) -17.18%, rgba(255, 200, 67, 0.70) 3.8%, rgba(70, 185, 120, 0.70) 73.19%, rgba(0, 179, 226, 0.70) 112.7%)",
                placeItems: "center",
                overflow: "hidden",
            }}
        >
            {children}
        </Box>
    )
}

export default BackgroundSinacofi