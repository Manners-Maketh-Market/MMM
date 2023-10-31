const ACCESS_TOKEN_KEY = "access_token";

const TokenRepository = {
  setToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  deleteToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export default TokenRepository;
