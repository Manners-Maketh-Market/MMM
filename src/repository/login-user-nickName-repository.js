const NICKNAME_KEY = "nickname_key";

const LoginUserNickNameRepository = {
  setUserNickName(idx) {
    localStorage.setItem(NICKNAME_KEY, idx);
  },

  getUserNickName() {
    return localStorage.getItem(NICKNAME_KEY);
  },
};

export default LoginUserNickNameRepository;
