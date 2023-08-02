import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userType: null,
  emailId: null,
  verifyOTPpage: null,
  password: null,
  //
  AuthToken: null,
  tokenDecodeData: null,
  userId: null,

  //
  //
  //
  //
  //
  //
  //step1
  ministryOfTransportDoc: null,
  generalDirectorateOfBorderGuardDoc: null,
  boatDocumentationsAndLicenses: null,

  //step2
  boatType: null,
  boatService: null,
  //
  Boat_name: null,
  Boat_type: null,
  Boat_year: null,
  Boat_length: null,
  Boat_max_capacity: null,
  Boat_price_per_hour: null,
  Upload_images_of_your_boat: null,
  Boat_services_selected: null,
  Marine_name: null,
  Marine_address: null,
  Boat_backgroung_image: null,
  Boat_profile_image: null,
  //
  confirmTickMsg_title: null,
  confirmTickMsg_buttonName: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    UserType(state, action) {
      state.userType = action.payload;
    },
    EmailId(state, action) {
      state.emailId = action.payload;
    },
    verifyOTP(state, action) {
      state.verifyOTPpage = action.payload;
    },
    Password(state, action) {
      state.password = action.payload;
    },
    AuthToken(state, action) {
      state.AuthToken = action.payload;
    },
    TokenDecodeData(state, action) {
      state.tokenDecodeData = action.payload;
    },
    UserId(state, action) {
      state.userId = action.payload;
    },
    //
    //
    //
    //
    //
    boatRegisterStep1(state, action) {
      state.ministryOfTransportDoc = action.payload.ministryOfTransportDoc;
      state.generalDirectorateOfBorderGuardDoc =
        action.payload.generalDirectorateOfBorderGuardDoc;
      state.boatDocumentationsAndLicenses =
        action.payload.boatDocumentationsAndLicenses;
    },
    boatTypeList(state, action) {
      state.boatType = action.payload;
    },
    boatServiceList(state, action) {
      state.boatService = action.payload;
    },
    boatRegisterStep2(state, action) {
      state.Boat_name = action.payload.Boat_name;
      state.Boat_type = action.payload.Boat_type;
      state.Boat_year = action.payload.Boat_year;
      state.Boat_length = action.payload.Boat_length;
      state.Boat_max_capacity = action.payload.Boat_max_capacity;
      state.Boat_price_per_hour = action.payload.Boat_price_per_hour;
      state.Upload_images_of_your_boat =
        action.payload.Upload_images_of_your_boat;
      state.Boat_services_selected = action.payload.Boat_services_selected;
      state.Marine_name = action.payload.Marine_name;
      state.Marine_address = action.payload.Marine_address;
      state.Boat_backgroung_image = action.payload.Boat_backgroung_image;
      state.Boat_profile_image = action.payload.Boat_profile_image;
    },

    confirmTickMsg(state, action) {
      console.log("action.payload", action.payload);
      state.confirmTickMsg_title = action.payload?.title;
      state.confirmTickMsg_buttonName = action.payload?.buttonName;
    },
  },
});
export const {
  UserType,
  EmailId,
  verifyOTP,
  Password,
  AuthToken,
  UserId,
  boatRegisterStep1,
  boatTypeList,
  boatServiceList,
  boatRegisterStep2,
  TokenDecodeData,
  confirmTickMsg,
} = authSlice.actions;

export default authSlice.reducer;
