export const API = {
  currentEnv: "qa",
  baseUrls: {
    // dev: "",
    // prod: "http://localhost:3002/",
    dev: "http://localhost:3000/",
    qa: "https://oceanhub.herokuapp.com/",
    //
    // 192.168.5.82
    // localhost
  },
  authUrls: {
    user_register: "user/register",
    verify_otp: "user/otp",
    login: "user/login",
    resend_otp: "user/resend-otp",
    boat_type: "boat_type",
    boat_service: "boat_service",
    boat_register: "boat_register",
    my_listing: "my_listing",
    boat_list_filter: "boat_list",
    forgot_password_request: "forgot-password-request",
    verify_forgotpass_otp: "verify-forgotpass-otp",
    set_password: "set-password",
    single_boat_data: "single_boat_data",
    update_boat: "update_boat",
  },
};
