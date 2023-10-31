import { useState } from "react";

const useModalHandle = () => {
  const [isModalOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isModalOpen);
  };

  return { isModalOpen, handleClick };
};

export default useModalHandle;
