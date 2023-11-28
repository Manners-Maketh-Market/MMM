import AuthApi from "apis/auth";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import TokenRepository from "repository/token-repository";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  // 새로고침 시 token 넣어주기
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setAccessToken(token);
  });

  return (
    <AuthContext.Provider value={[accessToken, setAccessToken]}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  const [accessToken, setAccessToken] = useContext(AuthContext);

  const SignUp = async (signUpData) => {
    const res = await AuthApi.postSignUpData(signUpData);
  };

  const SignIn = async (loginUserData) => {
    const res = await AuthApi.postLoginUserData(loginUserData);
    setAccessToken(res.tokenForHeader);
    TokenRepository.setToken(res.tokenForHeader);
  };

  const SignOut = async () => {
    await AuthApi.getUserLogout();
    setAccessToken(null);
    TokenRepository.deleteToken();
  };

  return {
    accessToken,
    SignUp,
    SignIn,
    SignOut,
  };
};
