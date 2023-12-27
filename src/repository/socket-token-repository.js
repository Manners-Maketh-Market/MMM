export const SocketTokenRepository = {
  setToken(token) {
    localStorage.setItem("socket-token", token);
  },

  getToken() {
    return localStorage.getItem("socket-token");
  },
};
