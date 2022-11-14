import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalProps: null,
  content: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalProps = action.payload.modalProps;
      state.content = action.payload.content;
    },
    closeModal: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
