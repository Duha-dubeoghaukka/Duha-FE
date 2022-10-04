import axios from "axios";

export const api = axios.create({
  baseURL: "http://43.201.5.53:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,"
  },
  withCredentials: true
});

// 매 실행 시 토큰값 넣기, 없으면 null값이 들어간다
api.interceptors.request.use(function (config) {
  const refreshToken = localStorage.getItem("refresh-token");
  const accessToken = localStorage.getItem("authorization");
  config.headers.common["authorization"] = `${accessToken}`;
  config.headers.common["refresh-token"] = `${refreshToken}`;
  return config;
});

export const scheduleAPIs = {
  register: data => {
    return api.post("/auth/trip", data);
  },
  getRegisterInfo: () => {
    return api.get("/auth/trip");
  },
  getShareSchedule: () => {
    return api.get("/trip");
  },
  deleteSchedule: tripId => {
    return api.delete(`/auth/trip/${tripId}`);
  },
  getShareDetailCourse: tripId => {
    return api.get(`/trip/${tripId}`);
  }
};

export const socialLoginAPIs = {
  kakaoLogin: code => {
    return api.get(`http://13.125.222.172/oauth/kakao?code=${code}`);
  },
  googleLogin: code => {
    return api.get(`oauth/google?code=${code}`);
  }
};

export const mypageAPIs = {
  getFavoritesNum: () => {
    return api.get("/auth/mypage");
  },
  getFavoriteLists: pathVariable => {
    return api.get(`auth/mypage/${pathVariable}/bookmark`);
  },
  postBookMark: id => {
    return api.get("/auth/trip/bookmark/" + id);
  }
};

export const instance = axios.create({
  baseURL: "http://43.201.5.53:8080/",
  headers: {
    "Content-Type": "application/json"
  }
});
