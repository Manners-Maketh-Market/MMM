// token key || session storage 주소가 변경되었을 때 여기 내용만 바꿔주면 됨

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
