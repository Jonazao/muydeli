import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../features/config/modalSlice';

export default function useAppModal() {
  const dispatch = useDispatch();

  return {
    openModal: useCallback(
      (props) => {
        dispatch(openModal(props));
      },
      [dispatch],
    ),
    closeModal: useCallback(() => {
      dispatch(closeModal());
    }, [dispatch]),
  };
}
