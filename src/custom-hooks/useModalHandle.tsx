import { useState } from 'react';

const useModalHandle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return { isOpen, handleClick };
};

export default useModalHandle;