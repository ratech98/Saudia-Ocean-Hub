import axios from "axios";
import { API } from "../constants";

export function register(data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.user_register,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function verifyOtp(data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.verify_otp,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function login(data) {
  return axios.post(API.baseUrls[API.currentEnv] + API.authUrls.login, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function resend_otp(data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.resend_otp,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function boat_type(token) {
  return axios.get(API.baseUrls[API.currentEnv] + API.authUrls.boat_type, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function boat_service(token) {
  return axios.get(API.baseUrls[API.currentEnv] + API.authUrls.boat_service, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function boat_register(token, data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.boat_register,
    data,
    {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function my_listing(token) {
  return axios.get(API.baseUrls[API.currentEnv] + API.authUrls.my_listing, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function boat_list_filter(token) {
  return axios.get(
    API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
