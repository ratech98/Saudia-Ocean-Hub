import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  // ministryOfTransportDoc: null,
  // generalDirectorateOfBorderGuardDoc: null,
  // boatDocumentationsAndLicenses: null,
  boat_id: null,
  single_boat_details: null,
};

const dashSlice = createSlice({
  initialState,
  name: "dashboard",
  reducers: {
    // boatRegisterStep1__(state, action) {
    //   state.ministryOfTransportDoc = action.payload.ministryOfTransportDoc;
    //   state.generalDirectorateOfBorderGuardDoc =
    //     action.payload.generalDirectorateOfBorderGuardDoc;
    //   state.boatDocumentationsAndLicenses =
    //     action.payload.boatDocumentationsAndLicenses;
    // },
    search_boat_id(state, action) {
      state.boat_id = action.payload;
    },
    single_boat_details_store(state, action) {
      state.single_boat_details = action.payload;
    },
  },
});
export const {
  boatRegisterStep1__,
  search_boat_id,
  single_boat_details_store,
} = dashSlice.actions;

export default dashSlice.reducer;
