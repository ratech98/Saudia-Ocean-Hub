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

export function boat_type(token) {
  return axios.get(API.baseUrls[API.currentEnv] + API.authUrls.boat_type, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function boat_service(token) {
  console.log("API", API.baseUrls[API.currentEnv] + API.authUrls.boat_service);
  return axios.get(API.baseUrls[API.currentEnv] + API.authUrls.boat_service, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function boat_register(token, data) {
  console.log("API", API.baseUrls[API.currentEnv] + API.authUrls.boat_register);
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.boat_register,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
