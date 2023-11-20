import { axiosInstance } from "./core";

const PATH = "/user";

const AuthApi = {
  async signIn(email, password) {
    const response = await axiosInstance.post(PATH + "/login", {
      email,
      password,
    });
    return response.data;
  },

  async signUp(email, password, nickName) {
    const response = await axiosInstance.post(PATH + "/sign", {
      email,
      password,
      nickName,
    });
    console.log(response.data);
    return response.data;
  },

  async signOut() {
    const response = await axiosInstance.post(PATH + "/logout");
    return response.data;
  },

  async refresh() {
    const response = await axiosInstance.post(PATH + "/jwt");
    return response.data;
  },
};

export default AuthApi;
