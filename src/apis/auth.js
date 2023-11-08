// import { axiosInstance } from "./core";

// const PATH = "/user";

// const AuthApi = {
//   async signIn(email, password) {
//     const res = await axiosInstance.post(PATH + "/login", { email, password });
//     return res.data;
//   },
//   async signUp(email, password) {
//     const res = await axiosInstance.post(PATH + "/sign", { email, password });
//     return res.data;
//   },
//   async signOut() {
//     const res = await axiosInstance.post(PATH + "/logout");
//     return res.data;
//   },
//   // refresh token 재발급
//   async refresh() {
//     const res = await axiosInstance.post(PATH + "/jwt");
//     return res.data;
//   },
// };
// export default AuthApi;

// axios 사용하면 할것