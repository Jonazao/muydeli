import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return {
    isOpen,
    openModal,
    closeModal,
    toggle,
    setIsOpen,
  };
}
