import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInterface {
  modalQuickView: number;
  modalKP: boolean;
  modalLogin: boolean;
  modalQueryRegister: boolean;
}

// Սկզբնական state
const initialState: IInterface = {
  modalQuickView: 0,
  modalKP: false,
  modalLogin: false,
  modalQueryRegister: false,
};

// Ստեղծել slice
export const modalsSite = createSlice({
  name: "modals",
  initialState,
  reducers: {
    serModalQuickView: (state, action: PayloadAction<number>) => {
      state.modalQuickView = action.payload;
    },
    serModalKP: (state, action: PayloadAction<boolean>) => {
      state.modalKP = action.payload;
    },
    serModalLogin: (state, action: PayloadAction<boolean>) => {
      state.modalLogin = action.payload;
    },
    serModalQueryRegister: (state, action: PayloadAction<boolean>) => {
      state.modalQueryRegister = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  serModalQuickView,
  serModalKP,
  serModalLogin,
  serModalQueryRegister,
} = modalsSite.actions;
export default modalsSite.reducer;
