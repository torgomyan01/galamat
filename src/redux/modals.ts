import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInterface {
  modalSelectedHouse: IHouse | null;
  objectInfo: IObjectData[] | null;
  modalSendRequest: boolean;
}

// Սկզբնական state
const initialState: IInterface = {
  modalSelectedHouse: null,
  objectInfo: null,
  modalSendRequest: false,
};

// Ստեղծել slice
export const modalsSite = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setHouse: (state, action: PayloadAction<IHouse | null>) => {
      state.modalSelectedHouse = action.payload;
    },
    setObjectInfo: (state, action: PayloadAction<IObjectData[] | null>) => {
      state.objectInfo = action.payload;
    },
    setModalSendRequest: (state, action: PayloadAction<boolean>) => {
      state.modalSendRequest = action.payload;
    },
  },
});

// Export actions and reducer
export const { setHouse, setObjectInfo, setModalSendRequest } =
  modalsSite.actions;
export default modalsSite.reducer;
