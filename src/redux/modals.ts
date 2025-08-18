import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInterface {
  modalSelectedHouse: IHouse | null;
  objectInfo: IObjectData[] | null;
  modalSendRequest: boolean;
  modalSendRequestGlaOne: string | null;
}

// Սկզբնական state
const initialState: IInterface = {
  modalSelectedHouse: null,
  objectInfo: null,
  modalSendRequest: false,
  modalSendRequestGlaOne: null,
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
    setModalSendRequestGalaOne: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.modalSendRequestGlaOne = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setHouse,
  setObjectInfo,
  setModalSendRequest,
  setModalSendRequestGalaOne,
} = modalsSite.actions;
export default modalsSite.reducer;
