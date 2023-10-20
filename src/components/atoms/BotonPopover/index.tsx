import React from 'react';
import { IconButton } from '@mui/material';

interface BotonPopoverProps {
    children: React.ReactNode;
    handleClick: () => void;
}

const BotonPopover: React.FC<BotonPopoverProps> = ({ children, handleClick }) => {
    return (
        <IconButton onClick={handleClick}>
            {children}
        </IconButton>
    );
};


export default BotonPopover;
