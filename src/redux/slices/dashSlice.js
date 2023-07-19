import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  ministryOfTransportDoc: null,
  generalDirectorateOfBorderGuardDoc: null,
  boatDocumentationsAndLicenses: null,
};

const dashSlice = createSlice({
  initialState,
  name: "dashboard",
  reducers: {
    boatRegisterStep1__(state, action) {
      state.ministryOfTransportDoc = action.payload.ministryOfTransportDoc;
      state.generalDirectorateOfBorderGuardDoc =
        action.payload.generalDirectorateOfBorderGuardDoc;
      state.boatDocumentationsAndLicenses =
        action.payload.boatDocumentationsAndLicenses;
    },
  },
});
export const { boatRegisterStep1__ } = dashSlice.actions;

export default dashSlice.reducer;
