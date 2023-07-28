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

export function forgot_password_request(data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.forgot_password_request,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
export function verify_forgotpass_otp(data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.verify_forgotpass_otp,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function set_new__password(data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.set_password,
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

export function boat_list_filter(token, payload) {
  return axios.get(
    payload?.boat_type && payload?.price && payload?.capacity //type,price,capacity
      ? `${API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter}?type=${
          payload?.boat_type
        }&price=${payload?.price}&capacity=${payload?.capacity}&page=${
          payload?.pageNo
        }&limit=${10}`
      : payload?.boat_type && payload?.price //type,price
      ? `${API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter}?type=${
          payload?.boat_type
        }&price=${payload?.price}&page=${payload?.pageNo}&limit=${10}`
      : payload?.boat_type && payload?.capacity //type,capacity
      ? `${API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter}?type=${
          payload?.boat_type
        }&capacity=${payload?.capacity}&page=${payload?.pageNo}&limit=${10}`
      : payload?.boat_type && payload?.capacity //price,capacity
      ? `${
          API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter
        }?price=${payload?.price}&capacity=${payload?.capacity}&page=${
          payload?.pageNo
        }&limit=${10}`
      : payload?.boat_type
      ? `${API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter}?type=${
          payload?.boat_type
        }&page=${payload?.pageNo}&limit=${10}`
      : payload?.price
      ? `${
          API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter
        }?price=${payload?.price}&page=${payload?.pageNo}&limit=${10}`
      : payload?.capacity
      ? `${
          API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter
        }?capacity=${payload?.capacity}&page=${payload?.pageNo}&limit=${10}`
      : `${API.baseUrls[API.currentEnv] + API.authUrls.boat_list_filter}?page=${
          payload?.pageNo
        }&limit=${10}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// export function (token, data) {
//   console.log("token", `Bearer ${token}`);
//   console.log(
//     "API",
//     API.baseUrls[API.currentEnv] + API.authUrls.single_boat_data
//   );

//   return axios.get(
//     API.baseUrls[API.currentEnv] + API.authUrls.single_boat_data,
//     JSON.stringify(data),
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// }

// export function single_boat_data_API(token, data) {
//   return axios.get(
//     API.baseUrls[API.currentEnv] + API.authUrls.single_boat_data,

//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: JSON.stringify(data),
//     }
//   );
// }

export function single_boat_data_API(token, data) {
  return axios.post(
    API.baseUrls[API.currentEnv] + API.authUrls.single_boat_data,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // data: JSON.stringify(data),
    }
  );
}
